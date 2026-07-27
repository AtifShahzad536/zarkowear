import { configureStore } from '@reduxjs/toolkit';
import builderReducer from '../features/builder/builderSlice';
import { undoMiddleware } from '../features/builder/undoMiddleware';

export const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(undoMiddleware),
});
