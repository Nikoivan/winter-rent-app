import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { auditSlice } from './slices/auditSlice/auditSlice.ts';
import { localStorageMiddleware } from './middleWares/localStorageMiddleware.tsx';
import { calendarSlice } from '../../components/Calendar/lib/calendarSlice.ts';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineSlices(auditSlice, calendarSlice);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware, sagaMiddleware)
});

// sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
