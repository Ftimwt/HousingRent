import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getApiUrl, prepareHeaders} from "@housing_rent/redux/requests/index";

export const CreateAccountApi = createApi({
    reducerPath: 'create_account',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl('/v1/auth'),
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        createAccount: builder.mutation<AuthResponseI, CreateAccountI>({
            query: (body) => ({
                url: '/signup/',
                body,
                method: 'post',
            }),
            invalidatesTags: ['auth']
        }),
    })
});

export const {
    useCreateAccountMutation
} = CreateAccountApi;