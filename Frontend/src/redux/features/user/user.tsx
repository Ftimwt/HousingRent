import {useAppDispatch, useAppSelector} from "@housing_rent/redux/hooks";
import {useCallback, useEffect} from "react";
import {useLazyWhoamiQuery, useLoginMutation} from "@housing_rent/redux/requests/auth";
import useToken from "@housing_rent/redux/features/token/token";
import {setUser} from "@housing_rent/redux/features/user/userSlice";

export default function useUser() {
    const {user} = useAppSelector((state) => state.user);

    const {update: updateToken, accessToken, refreshToken} = useToken();

    const [loginReq, {
        data: loginResponse,
        isLoading: loadingLogin
    }] = useLoginMutation();
    const [whoami, {isLoading: whoamiLoading, data: userResponse, error: loginError}] = useLazyWhoamiQuery();

    const dispatch = useAppDispatch();

    const login = useCallback((data: LoginRequestI) => {
        return loginReq(data);
    }, []);

    useEffect(() => {
        if (!loginResponse) return;
        updateToken({
            refreshToken: loginResponse.token?.refresh,
            accessToken: loginResponse.token?.access
        });
    }, [loginResponse]);

    useEffect(() => {
        console.log(accessToken);
        whoami();
    }, [accessToken, refreshToken])

    useEffect(() => {
        if (!userResponse) return;
        dispatch(setUser(userResponse))
    }, [userResponse]);

    const loading = loadingLogin || whoamiLoading;

    return {login, loading, user, loginError};
}