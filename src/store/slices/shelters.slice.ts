import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "..";
import {ERequestStatus} from "../../common/request";
import * as api from "../../api";


export interface IShelterState {
    shelters: Shelter[];
    activeShelter: Shelter | null;
    categories: Category[];
    architectures: Architecture[];
    status: ERequestStatus;
}

const initialState: IShelterState = {
    shelters: [],
    activeShelter: null,
    categories: [],
    architectures: [],
    status: ERequestStatus.IDLE,
};

export const fetchShelters = createAsyncThunk("shelters/fetchShelters", async () => {
    console.log("FETCHING SHELTERS");
    const response = await api.readShelters();
    return response;
});

export const deleteShelter = createAsyncThunk("shelters/deleteShelter", async (shelter: Shelter) => {
    const response = await api.deleteShelter(shelter);
    return response;
});

export const updateShelter = createAsyncThunk("shelters/updateShelter", async (shelter: Shelter, {
    dispatch
}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const fallback = getState().shelters.find((s: Shelter) => s.id === shelter.id);
    try {
        const isNew = !shelter.id;
        dispatch(sheltersSlice.actions.saveActiveShelter());
        api.updateShelter(shelter);
    } catch (err) {
        console.error(err);
        // dispatch(sheltersSlice.actions.updateShelter(fallback));
    }
});

export const addShelter = createAsyncThunk("shelters/addShelter", async (shelter: Shelter) => {
    return await api.addShelter(shelter);
});

export const addAKA = createAsyncThunk("shelters/addAKA", async (shelterId: number) => {
    console.log("ADDING AKA RESPONSE", shelterId);
    const response = await api.addAKA(shelterId);
    console.log("ADD AKA RESPONSE", response);
    return response;
});

export const fetchCategories = createAsyncThunk("shelters/fetchCategories", async () => {
    console.log("FETCHING CATEGORIES");
    return await api.readCategories();
});

export const fetchArchitectures = createAsyncThunk("shelters/fetchArchitectures", async () => {
    console.log("FETCHING ARCHITECTURES");
    return await api.readArchitectures();
});

export const sheltersSlice = createSlice({
    name: "shelters",
    initialState,
    reducers: {
        activateShelter: (_state, action: PayloadAction<Shelter>) => {
            const state = _state;
            state.activeShelter = action.payload
        },
        clearActiveShelter: (_state) => {
            const state = _state;
            state.activeShelter = null;
        },
        saveActiveShelter: (_state) => {
            const state = _state;
            const shelterIds = state.shelters.map(s => s.id);
            const activeShelter = state.activeShelter;
            if (shelterIds.includes(activeShelter.id)) {
                state.shelters = state.shelters.map(s => s.id === activeShelter.id ? activeShelter : s);
            } else {
                state.shelters = [...state.shelters, activeShelter];
            }
        },
        updateActiveShelter: (state, action: PayloadAction<{[key:string]: string}>) => {
            const updatedShelter = {...state.activeShelter, ...action.payload};
            console.log("UPDATED SHELTER", updatedShelter);
            state.activeShelter = updatedShelter;
        },
        addAKA: (_state, action: PayloadAction<AKA>) => {
            const state = _state;
            state.activeShelter.akas = state.activeShelter.akas.concat(action.payload)
        },
        deleteAKA: (_state, action: PayloadAction<number>) => {
            const state = _state;
            state.activeShelter.akas = state.activeShelter.akas.filter(a => a.id !== action.payload);
        },
        updateAKAs: (_state, action: PayloadAction<{aka: AKA, index: number} >) => {
            const state = _state;
            state.activeShelter.akas[action.payload.index] = action.payload.aka;
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
                state.shelters = state.shelters.filter((u) => u.id !== action.meta.arg.id);
            })
            .addCase(deleteShelter.rejected, (_state) => {
                _state.status = ERequestStatus.FAILED;
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
                state.architectures = action.payload;
            })
            .addCase(fetchArchitectures.rejected, (_state) => {
                const state = _state;
            })
            .addCase(addAKA.pending, (_state) => {
                const state = _state;
            })
            // TOODO: Fix this
            // .addCase(addAKA.fulfilled, (_state, action) => {
            //     const state = _state;
            //     //state.shelters[state.activeShelter.id].akas = state.shelters[state.activeShelter.id].akas.concat(action.payload);
            //     state.shelters = state.shelters;
            // })
            .addCase(addAKA.rejected, (_state) => {
                const state = _state;
            })
    },
});

export const {activateShelter, saveActiveShelter, clearActiveShelter,  updateActiveShelter} = sheltersSlice.actions


// SELECTORS
export const selectShelters = (state: RootState) => state.shelters.shelters;
export const selectStatus = (state: RootState) => state.shelters.status;
export const selectActiveShelter = (state: RootState) => state.shelters.activeShelter;
export const selectCategories = (state: RootState) => state.shelters.categories;
export const selectArchitectures = (state: RootState) => state.shelters.architectures;

export default sheltersSlice.reducer;
