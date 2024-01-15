import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user?: UserModel;
}

const initialState = (): UserState => ({
    user: undefined,
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserModel>) => {
            state.user = action.payload;
        },
        resetUser: (state) => {
            state.user = undefined;
        }
    }
})

export const {setUser, resetUser} = userSlice.actions;
