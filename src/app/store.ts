import { configureStore } from '@reduxjs/toolkit';
import user from '../features/userSearch/userSlice';

const store = configureStore({
  reducer: {
    user,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
