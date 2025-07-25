import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncAction'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false,
        errorMessage: '',
        isOpenModal: false,
        modalContent: null,
    },
    reducers: {
        showModal: (state, action) => {
            state.isOpenModal = action.payload.isOpenModal;
            state.modalContent = action.payload.modalContent;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        });

        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
})
export const { showModal } = appSlice.actions

export default appSlice.reducer