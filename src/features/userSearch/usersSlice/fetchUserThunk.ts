import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {
  GitHubResponseHeaders,
  PublicGitHubApiResult,
  PublicGitHubUser,
  getRateLimit,
  getUser,
} from '../../../common/services/publicGitHubApi';
import { AxiosError } from 'axios';
import { RootState } from '../../../app/store';
import { SliceState } from './index';

type ActionHandler<TAction> = (
  sliceState: SliceState,
  action: TAction
) => SliceState | void;

type PendingAction = PayloadAction<
  undefined,
  string,
  {
    arg: string;
    requestId: string;
    requestStatus: 'pending';
  },
  never
>;

type FulfilledAction = PayloadAction<
  PublicGitHubApiResult<PublicGitHubUser>,
  string,
  {
    arg: string;
    requestId: string;
    requestStatus: 'fulfilled';
  },
  never
>;

type RejectedAction = PayloadAction<
  unknown,
  string,
  {
    arg: string;
    requestId: string;
    requestStatus: 'rejected';
    aborted: boolean;
    condition: boolean;
  } & (
    | {
        rejectedWithValue: true;
      }
    | ({
        rejectedWithValue: false;
      } & {})
  ),
  SerializedError
>;

export const fetchUser = createAsyncThunk<
  PublicGitHubApiResult<PublicGitHubUser>,
  string,
  { state: RootState }
>(
  `users/fetchUser`,
  async (username: string, { getState, rejectWithValue }) => {
    try {
      return await getUser(username);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.headers) {
        const rateLimit = getRateLimit(
          error.response?.headers as GitHubResponseHeaders
        );

        return rejectWithValue({
          rateLimit,
        });
      }
    }
    const { rateLimit } = getState().users;

    return rejectWithValue(rateLimit);
  },
  {
    condition: (username: string, { getState }) => {
      const { users } = getState();
      const hasUserWithUsername: boolean = users.searchedUsers.some(
        (user) => user.login === username
      );

      // return false to cancel action.
      return !hasUserWithUsername;
    },
    dispatchConditionRejection: true,
  }
);

export const onFetchUserPending: ActionHandler<PendingAction> = (_, action) =>
  console.log(`fetching user: ${action.meta.arg}`);

export const onFetchUserFulfilled: ActionHandler<FulfilledAction> = (
  { searchedUsers },
  action
) => {
  const maxNumberStoredUsers: number = 10;
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
};

const onRejectedByCondition: ActionHandler<RejectedAction> = (
  { searchedUsers, rateLimit },
  action
) => {
  const searchedUsername = action.meta.arg;

  const searchedUser = searchedUsers.find(
    (user) => user.login === searchedUsername
  ) as PublicGitHubUser;

  const otherUsers = searchedUsers.filter(
    (user) => user.login !== searchedUsername
  );

  return {
    searchedUsers: [searchedUser, ...otherUsers],
    searchResult: {
      searchedUsername: searchedUsername,
      user: searchedUser,
    },
    rateLimit,
  };
};

const onRejected: ActionHandler<RejectedAction> = (
  { rateLimit, searchedUsers },
  action
) => {
  const searchedUsername = action.meta.arg;

  console.log(`Failed to fetch user ${action.meta.arg}`);

  // Update rate limit from rejected value.
  const rejectedValue =
    action.payload as PublicGitHubApiResult<PublicGitHubUser>;
  if (action.meta.rejectedWithValue && rejectedValue) {
    rateLimit = {
      ...rejectedValue.rateLimit,
    };
  }

  return {
    searchedUsers,
    searchResult: {
      searchedUsername: searchedUsername,
      error: action.error,
    },
    rateLimit,
  };
};

export const onFetchUserRejected: ActionHandler<RejectedAction> = (
  sliceState,
  action
) => {
  if (action.meta.condition) {
    // Failed condition. Place searched user at the start of list.

    return onRejectedByCondition(sliceState, action);
  }

  return onRejected(sliceState, action);
};
