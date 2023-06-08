import { SerializedError, createSlice } from '@reduxjs/toolkit';
import {
  PublicGitHubUser,
  RateLimit,
} from '../../../common/services/publicGitHubApi';
import {
  fetchUser,
  onFetchUserFulfilled,
  onFetchUserPending,
  onFetchUserRejected,
} from './fetchUserThunk';

export type SearchResult<T extends 'fetching' | 'error' | 'found'> =
  T extends 'fetching'
    ? {
        searchedUsername: string;
        status: 'fetching';
      }
    : T extends 'error'
    ? {
        searchedUsername: string;
        status: 'error';
        error: SerializedError;
      }
    : T extends 'found'
    ? {
        searchedUsername: string;
        status: 'found';
        user: PublicGitHubUser;
      }
    : never;

export interface SliceState {
  searchedUsers: PublicGitHubUser[];
  searchResult: SearchResult<'fetching' | 'error' | 'found'> | null;
  rateLimit: RateLimit | null;
}

const initialState: SliceState = {
  searchedUsers: [],
  searchResult: null,
  rateLimit: null,
};

const clearUsersReducer = (state: SliceState): SliceState => {
  return {
    ...state,
    searchedUsers: [],
  };
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: clearUsersReducer,
  },
  extraReducers: (builder) => {
    // Fetch User Action Handlers.
    builder.addCase(fetchUser.pending, onFetchUserPending);
    builder.addCase(fetchUser.fulfilled, onFetchUserFulfilled);
    builder.addCase(fetchUser.rejected, onFetchUserRejected);
  },
});

export const { clearUsers } = usersSlice.actions;
export const users = usersSlice.reducer;

export * from './fetchUserThunk';
