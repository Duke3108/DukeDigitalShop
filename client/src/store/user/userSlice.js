import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncAction'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        mes: ''
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
            state.current = null
            state.mes = 'Bạn đã đăng xuất thành công'
        },
        clearMessage: (state) => {
            state.mes = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrentUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.token = null;
            state.mes = 'Phiên đăng nhập của bạn đã hết hạn, xin vui lòng đăng nhập lại';
        });
    },
})
export const { login, logout, clearMessage } = userSlice.actions

export default userSlice.reducer