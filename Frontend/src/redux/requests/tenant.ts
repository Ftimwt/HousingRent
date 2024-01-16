import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getApiUrl, prepareHeaders} from "@housing_rent/redux/requests/index";

export const TenantApi = createApi({
    reducerPath: 'tenant',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl('/v1/tenant/'),
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ['tenant'],
    endpoints: (builder) => ({
        sendRentRequest: builder.mutation<BaseResponse, number>({
            query: (id) => ({
                url: `estates/rent/${id}/request`,
                method: 'put',
            }),
            invalidatesTags: ['tenant']
        }),
        removeRentRequest: builder.mutation<BaseResponse, number>({
            query: (id) => ({
                url: `estates/rent/${id}/request`,
                method: 'delete',
            }),
            invalidatesTags: ['tenant']
        }),
        requests: builder.query<SendRentListResponseI, void>({
            query: () => ({
                url: 'estates/rent/requests',
            }),
            providesTags: ['tenant']
        })
    })
});

export const {useSendRentRequestMutation, useRequestsQuery, useRemoveRentRequestMutation} = TenantApi;