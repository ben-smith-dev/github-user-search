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

export interface SliceState {
  searchedUsers: PublicGitHubUser[];
  searchResult: {
    searchedUsername: string;
    status: 'fetching' | 'error' | 'found';
    user?: PublicGitHubUser;
    error?: SerializedError;
  } | null;
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
