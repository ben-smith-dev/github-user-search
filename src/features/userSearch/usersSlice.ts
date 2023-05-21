import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  getUser,
  PublicGitHubApiResult,
  PublicGitHubUser,
  RateLimit,
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
  rateLimit: RateLimit | null;
}

const maxNumberStoredUsers: number = 10;

const initialState: UsersSlice = {
  searchedUsers: [],
  searchResult: null,
  rateLimit: null,
};

const searchedUserFilter = (
  user: PublicGitHubUser,
  searchedUsername: string
): boolean => {
  return user.login === searchedUsername;
};

export const fetchUser = createAsyncThunk<
  PublicGitHubApiResult<PublicGitHubUser>,
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
      const searchedUser = action.payload.data;
      let users: PublicGitHubUser[] = [];

      if (searchedUser) {
        users = [searchedUser, ...searchedUsers].slice(0, endIndex);
      } else {
        users = searchedUsers;
      }

      return {
        searchedUsers: users,
        searchResult: {
          searchedUsername: username,
          user: searchedUser,
        },
        rateLimit: action.payload.rateLimit,
      };
    });

    builder.addCase(
      fetchUser.rejected,
      ({ searchedUsers, rateLimit }, action) => {
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
            rateLimit,
          };
        }

        console.log(`Failed to fetch user ${action.meta.arg}`);

        return {
          searchedUsers,
          searchResult: {
            searchedUsername: searchedUsername,
            error: action.error,
          },
          rateLimit,
        };
      }
    );
  },
});

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
