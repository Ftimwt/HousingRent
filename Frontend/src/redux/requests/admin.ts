import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getApiUrl, prepareHeaders} from "@housing_rent/redux/requests/index";

export const AdminApi = createApi({
    reducerPath: 'admin',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl('/v1/admin/'),
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ['admin'],
    endpoints: (builder) => ({
        notConfirmedEstates: builder.query<EstateModel[], void>({
            query: () => ({
                url: `estates/not_confirmed`,
            }),
            providesTags: ['admin']
        }),
        acceptEstate: builder.mutation<BaseResponse, number>({
            query: (id) => ({
                url: `estates/${id}/accept/`,
                method: 'put',
            }),
            invalidatesTags: ['admin']
        }),
    })
});

export const {
    useNotConfirmedEstatesQuery,
    useAcceptEstateMutation
} = AdminApi;