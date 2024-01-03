import {useAppDispatch, useAppSelector} from "@housing_rent/redux/hooks";
import {TokenState, updateAccessToken, updateToken} from "@housing_rent/redux/features/token/tokenSlice";
import {useEffect} from "react";
import TokenService from "@housing_rent/services/token";

export default function useToken() {
    const {refreshToken, accessToken} = useAppSelector((state) => state.token);

    const dispatch = useAppDispatch();

    useEffect(() => {
        refresh();
    }, []);

    const update = (token: TokenState) => {
        dispatch(updateToken(token))
    };

    const refresh = () => {
        TokenService.refreshToken().then(token => {
            if (!token) return;
            dispatch(updateAccessToken(token));
        });
    }

    return {refreshToken, accessToken, update, refresh};
}