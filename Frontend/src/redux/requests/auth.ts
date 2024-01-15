import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getApiUrl, prepareHeaders} from "@housing_rent/redux/requests/index";

export const AuthApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl('/v1/auth'),
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponseI, LoginRequestI>({
            query: (body) => ({
                url: '/login/',
                body,
                method: 'post',
            }),
            invalidatesTags: ['auth']
        }),
        whoami: builder.query<UserModel, void>({
            query: () => ({
                url: '/whoami'
            })
        })
    })
});

export const {
    useLoginMutation,
    useWhoamiQuery,
    useLazyWhoamiQuery
} = AuthApi;