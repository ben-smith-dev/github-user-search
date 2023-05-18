import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUser,
  PublicGitHubUser,
} from '../../common/services/publicGitHubApi';

export const fetchUser = createAsyncThunk('user/fetchUser', getUser);

const userSlice = createSlice<PublicGitHubUser | null, {}, 'user'>({
  name: 'user',
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (_, action) => {
        console.log(`fetching user: ${action.meta.arg}`);
      })
      .addCase(fetchUser.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(fetchUser.rejected, (_, action) => {
        console.log(`Failed to fetch user ${action.meta.arg}`);

        return null;
      });
  },
});

export default userSlice.reducer;
