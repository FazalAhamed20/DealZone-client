import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: "toggle",
    initialState: {
        authToggle: false,
        categoriesToggle: false,
    },
    reducers: {
        toggleAuth: (state) => {
            state.authToggle = !state.authToggle;
        },
        toggleCategories:(state)=>{
            state.categoriesToggle = !state.categoriesToggle;

        }
    }
});

export const { toggleAuth, toggleAddProduct, toggleCategories } = toggleSlice.actions;
export default toggleSlice.reducer;
