import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "..";
import {ERequestStatus} from "../../common/request";
import * as api from "../../api";


export interface IShelterState {
    shelters: Shelter[];
    activeShelterId: number | null;
    categories: Category[];
    architectures: Architecture[];
    status: ERequestStatus;
}

const initialState: IShelterState = {
    shelters: [],
    activeShelterId: null,
    categories: [],
    architectures: [],
    status: ERequestStatus.IDLE,
};

export const fetchShelters = createAsyncThunk("shelter/fetchShelters", async () => {
    console.log("FETCHING SHELTERS");
    const response = await api.readShelters();
    return response;
});

export const deleteShelter = createAsyncThunk("shelter/deleteShelter", async (shelter: Shelter) => {
    const response = await api.deleteShelter(shelter);
    return response;
});

export const updateShelter = createAsyncThunk("shelter/updateShelter", async (shelter: Shelter) => {
    const response = await api.updateShelter(shelter);
    return response;
});

export const addShelter = createAsyncThunk("shelter/addShelter", async (shelter: Shelter) => {
    const response = await api.addShelter(shelter);
    return response;
});



export const fetchCategories = createAsyncThunk("shelter/fetchCategories", async () => {
    console.log("FETCHING CATEGORIES");
    const response = await api.readCategories();
    return response;
});

export const fetchArchitectures = createAsyncThunk("shelter/fetchArchitectures", async () => {
    console.log("FETCHING ARCHITECTURES");
    const response = await api.readArchitectures();
    return response;
});

export const shelterSlice = createSlice({
    name: "shelters",
    initialState,
    reducers: {
        activateShelter: (_state, action: PayloadAction<number>) => {
            const state = _state;
            state.activeShelterId = isNaN(action.payload) ? null : action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShelters.pending, (_state) => {
                const state = _state;
                state.status = ERequestStatus.LOADING;
            })
            .addCase(fetchShelters.fulfilled, (_state, action) => {
                const state = _state;
                state.status = ERequestStatus.SUCCEEDED;
                state.shelters = action.payload;
            })
            .addCase(fetchShelters.rejected, (_state) => {
                const state = _state;
                state.status = ERequestStatus.FAILED;
            })
            .addCase(deleteShelter.pending, (_state) => {
                const state = _state;
                state.status = ERequestStatus.LOADING;
            })
            .addCase(deleteShelter.fulfilled, (_state, action) => {
                const state = _state;
                state.status = ERequestStatus.SUCCEEDED;
                state.shelters = state.shelters.filter((u) => u.id !== action.meta.arg);
            })
            .addCase(deleteShelter.rejected, (_state) => {
                const state = _state;
                state.status = ERequestStatus.FAILED;
            })
            .addCase(updateShelter.pending, (_state) => {
                const state = _state;
                state.status = ERequestStatus.LOADING;
            })
            .addCase(updateShelter.fulfilled, (_state: IShelterState, action) => {
                const state = _state;
                state.status = ERequestStatus.SUCCEEDED;
                state.shelters = state.shelters.map((s) =>
                    s.id !== action.meta.arg.id ? s : action.meta.arg,
                );
            })
            .addCase(updateShelter.rejected, (_state) => {
                const state = _state;
                state.status = ERequestStatus.FAILED;
            })
            .addCase(addShelter.pending, (_state) => {
                const state = _state;
                state.status = ERequestStatus.LOADING;
            })
            .addCase(addShelter.fulfilled, (_state: IShelterState, action) => {
                const state = _state;
                state.status = ERequestStatus.SUCCEEDED;
                state.shelters = [...state.shelters, action.payload];
            })
            .addCase(addShelter.rejected, (_state) => {
                const state = _state;
                state.status = ERequestStatus.FAILED;
            })
            .addCase(fetchCategories.pending, (_state) => {
                const state = _state;
            })
            .addCase(fetchCategories.fulfilled, (_state, action) => {
                const state = _state;
                state.status = ERequestStatus.SUCCEEDED;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (_state) => {
                const state = _state;
            })
            .addCase(fetchArchitectures.pending, (_state) => {
                const state = _state;
            })
            .addCase(fetchArchitectures.fulfilled, (_state, action) => {
                const state = _state;
                state.status = ERequestStatus.SUCCEEDED;
                state.architectures = action.payload;
            })
            .addCase(fetchArchitectures.rejected, (_state) => {
                const state = _state;
            })
    },
});

export const {activateShelter} = shelterSlice.actions


export const selectShelters = (state: RootState) => state.shelters.shelters;
export const selectStatus = (state: RootState) => state.shelters.status;
export const selectedActiveShelterId = (state: RootState) => state.shelters.activeShelterId;
export const selectCategories = (state: RootState) => state.shelters.categories;
export const selectArchitectures = (state: RootState) => state.shelters.architectures;

export default shelterSlice.reducer;
