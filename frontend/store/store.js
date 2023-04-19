import { configureStore } from '@reduxjs/toolkit'
import RootReducer from '../reducers/root_reducer';
import RootMiddleware from '../middleware/root_middleware';

const Store = configureStore({
    reducer: RootReducer,
    middleware: RootMiddleware
});

export default Store;
