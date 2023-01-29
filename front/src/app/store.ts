import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import diamondSlice from '../features/diamonds/diamondSlice';

export const store = configureStore({
  reducer: {
    diamond: diamondSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
