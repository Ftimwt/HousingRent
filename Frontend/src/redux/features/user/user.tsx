import {useAppDispatch, useAppSelector} from "@housing_rent/redux/hooks";
import {useCallback, useEffect} from "react";
import {useLazyWhoamiQuery, useLoginMutation} from "@housing_rent/redux/requests/auth";
import useToken from "@housing_rent/redux/features/token/token";
import {resetUser, setUser} from "@housing_rent/redux/features/user/userSlice";
import create_account from "@housing_rent/components/dialog/auth/create_account";
import {useCreateAccountMutation} from "@housing_rent/redux/requests/create_account";

export default function useUser() {
    const {user} = useAppSelector((state) => state.user);

    const {update: updateToken, accessToken, refreshToken} = useToken();

    const [loginReq, {
        data: loginResponse,
        isLoading: loadingLogin
    }] = useLoginMutation();

    const [createAccountReq, {
        data: createAccountResponse,
        isLoading: loadingCreateAccoun
    }] = useCreateAccountMutation();

    const [whoami, {isLoading: whoamiLoading, data: userResponse, error: loginError}] = useLazyWhoamiQuery();

    const dispatch = useAppDispatch();

    const login = useCallback((data: LoginRequestI) => {
        return loginReq(data);
    }, []);

    const createAccount = useCallback((data: CreateAccountI) => {
        return createAccountReq(data);
    }, []);

    const logout = useCallback(() => {
        updateToken({refreshToken: undefined, accessToken: undefined});
        dispatch(resetUser());
    }, []);

    useEffect(() => {
        if (!loginResponse && !createAccountResponse) return;

        updateToken({
            refreshToken: (loginResponse ?? createAccountResponse)!.token?.refresh,
            accessToken: (loginResponse ?? createAccountResponse)!.token?.access
        });
    }, [loginResponse, createAccountResponse]);

    useEffect(() => {
        whoami();
    }, [accessToken, refreshToken])

    useEffect(() => {
        if (!userResponse) return;
        dispatch(setUser(userResponse))
    }, [userResponse]);

    const loading = loadingLogin || whoamiLoading;

    return {login, loading, user, loginError, logout, createAccount};
}