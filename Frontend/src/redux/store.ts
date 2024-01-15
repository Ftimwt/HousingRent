import {configureStore} from '@reduxjs/toolkit';
import {AuthApi} from "@housing_rent/redux/requests/auth";
import {EstateApi} from "@housing_rent/redux/requests/estates";

const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [EstateApi.reducerPath]: EstateApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AuthApi.middleware)
            .concat(EstateApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;