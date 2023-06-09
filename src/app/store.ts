import { configureStore } from '@reduxjs/toolkit';
import { users } from '../features/userSearch';

const store = configureStore({
  reducer: {
    users,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
