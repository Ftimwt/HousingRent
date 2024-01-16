import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getApiUrl, prepareHeaders} from "@housing_rent/redux/requests/index";

export const OwnerApi = createApi({
    reducerPath: 'owner',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl('/v1/owner/'),
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ['owner'],
    endpoints: (builder) => ({
        myEstates: builder.query<EstateModel[], void>({
            query: () => ({
                url: `estates`,
            }),
            providesTags: ['owner']
        }),
        removeRentRequest: builder.mutation<BaseResponse, number>({
            query: (id) => ({
                url: `estates/rent/${id}/request`,
                method: 'delete',
            }),
            invalidatesTags: ['owner']
        }),
        requests: builder.query<SendRentListResponseI, void>({
            query: () => ({
                url: 'estates/rent/requests',
            }),
            providesTags: ['owner']
        }),
        rentedHouses: builder.query<EstateModel[], void>({
            query: () => ({
                url: 'estates'
            }),
            providesTags: ['owner']
        })
    })
});

export const {
    useMyEstatesQuery
} = OwnerApi;