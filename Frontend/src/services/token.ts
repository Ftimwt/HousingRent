import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import {getApiUrl} from "@housing_rent/redux/requests";
import axios from "axios";

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

const getLocalAccessToken = (): string | undefined => {
    if (import.meta.env.NEXT_PUBLIC_MOCK?.toLowerCase() == 'true') {
        const token = import.meta.env.NEXT_PUBLIC_MOCK_API_TOKEN;
        if (!token || token === '') throw 'Mock Token not defined as a environment variable !';
        return token;
    }
    return getLocalToken(ACCESS_TOKEN);
};

const getLocalRefreshToken = (): string | undefined => {
    return getLocalToken(REFRESH_TOKEN);
}

const getLocalToken = (key: string): string | undefined => {
    const value = Cookies.get(key)
    if (value == "undefined") return undefined;
    return value;
}

const setLocalAccessToken = (accessToken: string): void => {
    Cookies.set(ACCESS_TOKEN, accessToken);
};

const setLocalRefreshToken = (refreshToken: string) => {
    Cookies.set(REFRESH_TOKEN, refreshToken);
}

const deleteLocalAccessToken = () => {
    Cookies.remove(ACCESS_TOKEN);
};

const deleteLocalRefreshToken = () => {
    Cookies.remove(REFRESH_TOKEN)
}

const deleteTokens = () => {
    deleteLocalRefreshToken();
    deleteLocalAccessToken();
};

type Token = {
    accessToken: string | undefined;
    refreshToken: string | undefined;
}

const refreshTokens = async (token: Token): Promise<string | undefined> => {
    let {accessToken, refreshToken} = token;
    let refresh = !accessToken && !!refreshToken;

    if (!refresh && refreshToken && accessToken) {
        const decodedToken: { exp: number } = jwtDecode(accessToken as string);
        const currentDate = Date.now()
        refresh = decodedToken.exp * 1000 < currentDate
    }

    if (refresh) {
        if (!refreshToken) {
            return undefined;
        }
        const body: RefreshTokenRequest = {
            refresh: refreshToken
        };
        let apiRefreshUrl = getApiUrl('/auth/refresh');
        const data = await axios.post(apiRefreshUrl, body);

        accessToken = data.data.access_token as string;
        TokenService.setLocalAccessToken(accessToken);
        return accessToken;
    }
}

const refreshToken = async (): Promise<string | undefined> => {
    const accessToken = getLocalAccessToken();
    const refreshToken = getLocalRefreshToken();

    return refreshTokens({refreshToken, accessToken});
}

const TokenService = {
    getLocalAccessToken,
    getLocalRefreshToken,
    setLocalAccessToken,
    setLocalRefreshToken,
    deleteLocalAccessToken,
    deleteLocalRefreshToken,
    deleteTokens,
    refreshToken
};

export default TokenService;