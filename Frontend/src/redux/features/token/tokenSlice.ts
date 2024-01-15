import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TokenService from "@housing_rent/services/token";

export interface TokenState {
    accessToken?: string;
    refreshToken?: string;
}

const initialState = (): TokenState => ({
    accessToken: TokenService.getLocalAccessToken(),
    refreshToken: TokenService.getLocalRefreshToken()
});

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        updateToken: (state, action: PayloadAction<TokenState>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            if (action.payload.accessToken)
                TokenService.setLocalAccessToken(action.payload.accessToken);

            if (action.payload.refreshToken)
                TokenService.setLocalRefreshToken(action.payload.refreshToken);
        },
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        deleteToken: (state) => {
            state.refreshToken = "";
            state.accessToken = "";
        },
        refresh: (state) => {
            TokenService.refreshToken().then(accessToken => state.accessToken = accessToken);
        }
    }
})

export const {
    updateToken,
    deleteToken,
    updateAccessToken
} = tokenSlice.actions;