import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUser,
  PublicGitHubUser,
} from '../../common/services/publicGitHubApi';
import { RootState } from '../../app/store';

const sliceDomain: string = 'users';
type UsersSlice = PublicGitHubUser[];
const maxNumberStoredUsers: number = 10;

const initialState: UsersSlice = [];

const searchedUserFilter = (
  user: PublicGitHubUser,
  searchedUsername: string
): boolean => {
  return user.login === searchedUsername;
};

export const fetchUser = createAsyncThunk<
  PublicGitHubUser,
  string,
  { state: RootState }
>(`${sliceDomain}/fetchUser`, getUser, {
  condition: (username: string, { getState }) => {
    const { users } = getState();
    const cachedUserWithUsername = users.find((user) => {
      return searchedUserFilter(user, username);
    });

    // Cancel if user is already in store.
    return !cachedUserWithUsername;
  },
  dispatchConditionRejection: true,
});

const userSlice = createSlice<UsersSlice, {}, typeof sliceDomain>({
  name: sliceDomain,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (_, action) => {
        console.log(`fetching user: ${action.meta.arg}`);
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const endIndex: number = Math.min(10, state.length + 1);

        return [action.payload, ...state].slice(0, endIndex);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (action.meta.condition) {
          // Failed condition. Place searched user at the start of list.

          const searchedUsername = action.meta.arg;
          const searchedUser = state.find((user) =>
            searchedUserFilter(user, searchedUsername)
          ) as PublicGitHubUser;

          const otherUsers = state.filter(
            (user) => !searchedUserFilter(user, searchedUsername)
          );

          return [searchedUser, ...otherUsers];
        }

        console.log(`Failed to fetch user ${action.meta.arg}`);

        return state;
      });
  },
});

export default userSlice.reducer;
