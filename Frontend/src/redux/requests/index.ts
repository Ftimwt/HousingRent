'use client'

// import TokenService from "@housing_rent/services/token";
// import {jwtDecode} from 'jwt-decode'
// import axios from "axios";


export const prepareHeadersDefault = (headers: Headers) => {
    headers.set('Accept', 'application/json');
    headers.set('Accept-Language', 'fa');
}

export const prepareHeaders = async (headers: Headers, {getState}: { getState: any }) => {
    prepareHeadersDefault(headers);

    const token = import.meta.env.VITE_DEV_TOKEN;
    if (token) {
        headers.set('Authorization', 'Bearer ' + token);
    }

    // let {accessToken, refreshToken} = (getState() as RootState).token

    // let refresh = !accessToken && !!refreshToken;
    // if (!refresh && refreshToken && accessToken) {
    //     const decodedToken: { exp: number } = jwtDecode(accessToken as string);
    //     const currentDate = Date.now()
    //     refresh = decodedToken.exp * 1000 < currentDate
    // }

    // if (refresh) {
    //     if (!refreshToken) {
    //         return headers;
    //     }
    //     const body: RefreshTokenRequest = {
    //         refresh: refreshToken
    //     }
    //     let apiRefreshUrl = getApiUrl('/auth/refresh');
    //     const data = await axios.post(apiRefreshUrl, body)
    //
    //     accessToken = data.data.access_token as string
    //     TokenService.setLocalAccessToken(accessToken);
    // }

    // headers.set('Authorization', 'Bearer ' + accessToken);
    return headers;
};

export const getApiUrl = (suffix: string) => {
    let prefix = import.meta.env.VITE_PREFIX_URL || '';
    prefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
    suffix = suffix.startsWith("/") ? suffix.substring(1) : suffix;
    return prefix + suffix;
};