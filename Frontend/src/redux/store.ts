import {configureStore} from '@reduxjs/toolkit';
import {AuthApi} from "@housing_rent/redux/requests/auth";
import {EstateApi} from "@housing_rent/redux/requests/estates";
import {tokenSlice} from "@housing_rent/redux/features/token/tokenSlice";
import {userSlice} from "@housing_rent/redux/features/user/userSlice";
import {TenantApi} from "@housing_rent/redux/requests/tenant";
import {OwnerApi} from "@housing_rent/redux/requests/owner";
import {CreateAccountApi} from "@housing_rent/redux/requests/create_account";
import {AdminApi} from "@housing_rent/redux/requests/admin";

const store = configureStore({
    reducer: {
        token: tokenSlice.reducer,
        user: userSlice.reducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [EstateApi.reducerPath]: EstateApi.reducer,
        [TenantApi.reducerPath]: TenantApi.reducer,
        [OwnerApi.reducerPath]: OwnerApi.reducer,
        [CreateAccountApi.reducerPath]: CreateAccountApi.reducer,
        [AdminApi.reducerPath]: AdminApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AuthApi.middleware)
            .concat(EstateApi.middleware)
            .concat(TenantApi.middleware)
            .concat(OwnerApi.middleware)
            .concat(CreateAccountApi.middleware)
            .concat(AdminApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;