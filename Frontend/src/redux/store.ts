import {configureStore} from '@reduxjs/toolkit';
import {AuthApi} from "@housing_rent/redux/requests/auth";
import {EstateApi} from "@housing_rent/redux/requests/estates";
import {tokenSlice} from "@housing_rent/redux/features/token/tokenSlice";
import {userSlice} from "@housing_rent/redux/features/user/userSlice";
import {TenantApi} from "@housing_rent/redux/requests/tenant";

const store = configureStore({
    reducer: {
        token: tokenSlice.reducer,
        user: userSlice.reducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [EstateApi.reducerPath]: EstateApi.reducer,
        [TenantApi.reducerPath]: TenantApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AuthApi.middleware)
            .concat(EstateApi.middleware)
            .concat(TenantApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;