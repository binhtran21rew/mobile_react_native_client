import {configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// import todoRuducer from '@/hooks/todoReducer';
import todoRuducer from '@/hooks/todoSlice';
import { useDispatch } from 'react-redux';
import { TodoApiSlice } from './slice/TodoApiSlice';
import {UserApiSlice} from './slice/UserApiSlice';
import {ChatApiSlice} from './slice/ChatApiSlice';


export const store = configureStore({

    // khai bao reducer can setup => co the handle trong state cuar RootState
    reducer: {
        todo: todoRuducer,
        [TodoApiSlice.reducerPath]: TodoApiSlice.reducer,
        [ChatApiSlice.reducerPath]: ChatApiSlice.reducer,
        [UserApiSlice.reducerPath]: UserApiSlice.reducer,// them reducer duoc tao tu api slice 
    },

    // them api middleware de enable cac tinh nang nhu caching, invalidation, polling cua rtk-query
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                                            .concat([
                                                TodoApiSlice.middleware,
                                                ChatApiSlice.middleware,
                                                UserApiSlice.middleware,
                                            ])


})

//Optional, nhung bat buoc dung neu dung tinh nang refetchOnFocus/ refetchOnReconnect
setupListeners(store.dispatch);

// Lay RootState va AppDispatch tu store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// cau hinh lai useDispatch de su dung khac voi dispatch cua thunkapi
export const useAppDispatch = () => useDispatch<AppDispatch>();