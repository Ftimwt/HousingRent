import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getApiUrl, prepareHeaders} from "@housing_rent/redux/requests/index";

export const EstateApi = createApi({
    reducerPath: 'estate',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl('/v1/estates'),
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ['estates'],
    endpoints: (builder) => ({
        nearestEstate: builder.query<NearestEstateResponseI, NearestEstateRequestI>({
            query: (params) => ({
                url: '/nearest',
                params
            }),
            providesTags: ['estates']
        }),
    })
});

export const {
    useNearestEstateQuery
} = EstateApi;
