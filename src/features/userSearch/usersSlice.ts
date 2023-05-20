import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  getUser,
  PublicGitHubUser,
} from '../../common/services/publicGitHubApi';
import { RootState } from '../../app/store';

const sliceDomain: string = 'users';
interface UsersSlice {
  searchedUsers: PublicGitHubUser[];
  searchResult: {
    searchedUsername: string;
    user?: PublicGitHubUser;
    error?: SerializedError;
  } | null;
}

const maxNumberStoredUsers: number = 10;

const initialState: UsersSlice = {
  searchedUsers: [],
  searchResult: null,
};

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
    const cachedUserWithUsername = users.searchedUsers.find((user) => {
      return searchedUserFilter(user, username);
    });

    // Cancel if user is already in store.
    return !cachedUserWithUsername;
  },
  dispatchConditionRejection: true,
});

const userSlice = createSlice({
  name: sliceDomain,
  initialState,
  reducers: {
    clearUsers(state: UsersSlice) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (_, action) => {
      console.log(`fetching user: ${action.meta.arg}`);
    });

    builder.addCase(fetchUser.fulfilled, ({ searchedUsers }, action) => {
      const endIndex: number = Math.min(
        maxNumberStoredUsers,
        searchedUsers.length + 1
      );

      const username: string = action.meta.arg;

      return {
        searchedUsers: [action.payload, ...searchedUsers].slice(0, endIndex),
        searchResult: {
          searchedUsername: username,
          user: action.payload,
        },
      };
    });

    builder.addCase(fetchUser.rejected, ({ searchedUsers }, action) => {
      const searchedUsername = action.meta.arg;

      if (action.meta.condition) {
        // Failed condition. Place searched user at the start of list.
        const searchedUser = searchedUsers.find((user) =>
          searchedUserFilter(user, searchedUsername)
        ) as PublicGitHubUser;

        const otherUsers = searchedUsers.filter(
          (user) => !searchedUserFilter(user, searchedUsername)
        );

        return {
          searchedUsers: [searchedUser, ...otherUsers],
          searchResult: {
            searchedUsername: searchedUsername,
            user: searchedUser,
          },
        };
      }

      console.log(`Failed to fetch user ${action.meta.arg}`);

      return {
        searchedUsers,
        searchResult: {
          searchedUsername: searchedUsername,
          error: action.error,
        },
      };
    });
  },
});

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
