import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "..";

export interface UIState {
    isLeftMenuOpen: boolean;
    filter: string | null;
}

const initialState: UIState = {
    isLeftMenuOpen: false,
    filter: null,
};


export const uiSlice = createSlice({
    name: "ui",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setFilter: (_state, action: PayloadAction<string>) => {
            const state = _state;
            state.filter = action.payload;
        },
        clearFilter: (_state) => {
            const state = _state;
            // Clear the filter by setting it to null
            state.filter = null;
        },
        toggleLeftMenu: (_state) => {
            const state = _state;
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isLeftMenuOpen = !state.isLeftMenuOpen;
        },
        openLeftMenu: (_state) => {
            const state = _state;
            state.isLeftMenuOpen = true;
        },
        closeLeftMenu: (_state) => {
            const state = _state;
            state.isLeftMenuOpen = false;
        },
    }
});

export const {toggleLeftMenu, closeLeftMenu, openLeftMenu, clearFilter, setFilter} = uiSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example, `useSelector((state: RootState) => state.counter.value)`
export const selectLeftMenuOpen = (state: RootState) => state.ui.isLeftMenuOpen;
export const selectFilter = (state: RootState) => state.ui.filter;
export default uiSlice.reducer;
