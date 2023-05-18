import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUser,
  PublicGitHubUser,
} from '../../common/services/publicGitHubApi';

const sliceDomain = 'users';

export const fetchUser = createAsyncThunk(`${sliceDomain}/fetchUser`, getUser);

const userSlice = createSlice<PublicGitHubUser[], {}, typeof sliceDomain>({
  name: sliceDomain,
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (_, action) => {
        console.log(`fetching user: ${action.meta.arg}`);
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return [action.payload, ...state];
      })
      .addCase(fetchUser.rejected, (_, action) => {
        console.log(`Failed to fetch user ${action.meta.arg}`);

        return [];
      });
  },
});

export default userSlice.reducer;
