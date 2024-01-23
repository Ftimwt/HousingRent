import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getApiUrl, prepareHeaders} from "@housing_rent/redux/requests/index";

export const OwnerApi = createApi({
    reducerPath: 'owner',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl('/v1/owner/'),
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ['owner', 'contract'],
    endpoints: (builder) => ({
        myEstates: builder.query<EstateModel[], void>({
            query: () => ({
                url: `estates`,
            }),
            providesTags: ['owner']
        }),
        removeRentRequest: builder.mutation<BaseResponse, number>({
            query: (id) => ({
                url: `estates/${id}/request`,
                method: 'delete',
            }),
            invalidatesTags: ['owner', 'contract']
        }),
        acceptRentRequest: builder.mutation<BaseResponse, number>({
            query: (id) => ({
                url: `estates/${id}/request`,
                method: 'put',
            }),
            invalidatesTags: ['owner', 'contract']
        }),
        requests: builder.query<SendRentListResponseI, void>({
            query: () => ({
                url: 'estates/requests',
            }),
            providesTags: ['owner']
        }),
        rentedHouses: builder.query<EstateModel[], void>({
            query: () => ({
                url: 'estates'
            }),
            providesTags: ['owner', 'contract']
        }),
        contracts: builder.query<EstateContract, void>({
            query: () => ({
                url: 'estates/contracts',
            }),
            providesTags: ['owner', 'contract']
        }),
        contractInstallments: builder.query<EstateContractInstallments[], void>({
            query: () => ({
                url: 'estates/contracts/installments'
            }),
            providesTags: ['owner', 'contract']
        })
    })
});

export const {
    useMyEstatesQuery,
    useRequestsQuery,
    useAcceptRentRequestMutation,
    useRemoveRentRequestMutation,
    useContractsQuery,
    useContractInstallmentsQuery
} = OwnerApi;