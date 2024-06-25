import React, {useCallback, useEffect, useReducer} from "react";
import "./styles.css";
import {
    Box,
    Chip,
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Tooltip,
    Typography,
    Stack,
    Paper, FormControlLabel, Switch
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import DefaultShelterImage from "./default-shelter-image";
import {shelterFactory} from "../../factories"; // Grid version 2
import {
    selectCategories,
    selectArchitectures
} from "../../store/slices/shelters.slice";
import AKAControl from "../aka-control/aka-control";
import {useAppSelector} from "../../store/hooks";

interface ShelterInfoProps {
    shelter?: Shelter;
}

enum Action {
    UPDATE_NAME,
    UPDATE_DESCRIPTION,
    UPDATE_IS_EXTANT,
    UPDATE_SLUG,
    UPDATE_IS_GMC,
    UPDATE_ARCHITECTURE,
    UPDATE_BUILT_BY,
    UPDATE_START_YEAR,
    UPDATE_END_YEAR,
    UPDATE_LATITUDE,
    UPDATE_LONGITUDE,
    UPDATE_ALTITUDE,
    UPDATE_NOTES,
    UPDATE_CATEGORY,
    ADD_AKA,
    REMOVE_AKA,
    UPDATE_AKA
}


function reducer(state: Shelter, action: { type: Action, payload?: any }): Shelter {
    switch (action.type) {
        case Action.UPDATE_NAME:
            return {
                ...state,
                name: action.payload
            };
        case Action.UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            };
        case Action.UPDATE_IS_EXTANT:
            return {
                ...state,
                isExtant: action.payload
            };
        case Action.UPDATE_SLUG:
            return {
                ...state,
                slug: action.payload
            };
        case Action.UPDATE_IS_GMC:
            return {
                ...state,
                isGMC: action.payload
            };
        case Action.UPDATE_ARCHITECTURE:
            return {
                ...state,
                architecture: action.payload
            };
        case Action.UPDATE_BUILT_BY:
            return {
                ...state,
                builtBy: action.payload
            };
        case Action.UPDATE_START_YEAR:
            return {
                ...state,
                startYear: action.payload
            };
        case Action.UPDATE_END_YEAR:
            return {
                ...state,
                endYear: action.payload
            };
        case Action.UPDATE_LATITUDE:
            return {
                ...state,
                latitude: action.payload
            };
        case Action.UPDATE_LONGITUDE:
            return {
                ...state,
                longitude: action.payload
            };
        case Action.UPDATE_ALTITUDE:
            return {
                ...state,
                altitude: action.payload
            };
        case Action.UPDATE_NOTES:
            return {
                ...state,
                notes: action.payload
            };
        case Action.UPDATE_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        case Action.ADD_AKA:
            return {
                ...state,
                akas: [...state.akas, action.payload]
            };
        case Action.REMOVE_AKA:
            return {
                ...state,
                akas: state.akas.filter(aka => aka.id !== action.payload.id)
            };
        case Action.UPDATE_AKA:
            return {
                ...state,
                akas: state.akas.map(a => a.id === action.payload.id ? action.payload : a)
            };
        default:
            throw Error("Unknown action.");
    }
}

const EditShelterInfo: React.FC<ShelterInfoProps> = ({shelter}) => {
    const categories = useAppSelector(selectCategories);
    const architectures = useAppSelector(selectArchitectures)
    const [state, dispatch] = useReducer(reducer, shelter || shelterFactory());
    return (
        <Box className={"edit_shelter_info_block"}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <TextField
                    label={"Name"}
                    variant={"outlined"}
                    value={state.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({type: Action.UPDATE_NAME, payload: event.target.value})
                    }}/>
                <Tooltip title="Should match the Worpress article slug">
                    <TextField
                        label={"Wordpress Slug"}
                        variant={"outlined"}
                        value={state.slug}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            dispatch({type: Action.UPDATE_SLUG, payload: event.target.value})
                        }}
                    />
                </Tooltip>
            </Box>
            <br/>
            <TextField
                label={"Description"}
                variant={"outlined"}
                sx={{width: "100%"}}
                multiline={true}
                value={state.description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch({type: Action.UPDATE_DESCRIPTION, payload: event.target.value})
                }}
            />
            <br/>
            <Divider className={"edit_shelter_info_divider"} textAlign="right">
                <FormControlLabel control={<Switch color={"success"} checked={state.isGMC}
                                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                       dispatch({
                                                           type: Action.UPDATE_IS_GMC,
                                                           payload: event.target.checked
                                                       })
                                                   }}/>} label="Is GMC Shelter"/>
            </Divider>
            <br/>
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <DefaultShelterImage/>
                </Grid>
                <Grid xs={8}>
                    <Box>
                        <Grid container spacing={1}>
                            <Grid xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="shelter_category">Category</InputLabel>
                                    <Select
                                        labelId="shelter_category-label"
                                        id="shelter_category-select"
                                        label="Category"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            dispatch({type: Action.UPDATE_CATEGORY, payload: event.target.value})
                                        }}
                                    >
                                        {
                                            (categories || []).map(category => (
                                                <MenuItem key={category.id} selected={category.name === state.category}
                                                          value={category.name}>
                                                    <Tooltip title={category.description} placement={"left-start"}>
                                                        <span className={"edit-menu-item"}> {category.name}</span>
                                                    </Tooltip>
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="shelter_architecture">Architectural Style</InputLabel>
                                    <Select
                                        labelId="shelter_architecture-label"
                                        id="shelter_architecture-select"
                                        value={state.architecture}
                                        label="Architecture"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            dispatch({
                                                type: Action.UPDATE_ARCHITECTURE,
                                                payload: event.target.value as string
                                            })
                                        }}
                                    >
                                        {
                                            (architectures || []).map(architecture => (
                                                <MenuItem key={architecture.id}
                                                          selected={architecture.name === state.architecture}
                                                          value={architecture.name}>
                                                    <Tooltip title={architecture.description} placement={"left-start"}>
                                                        <span className={"edit-menu-item"}>{architecture.name}</span>
                                                    </Tooltip>
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <TextField
                                        label={"Architect/Engineer"}
                                        variant={"outlined"}
                                        sx={{width: "100%"}}
                                        value={state.builtBy}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            dispatch({type: Action.UPDATE_BUILT_BY, payload: event.target.value})
                                        }}
                                    />
                                </Paper>
                            </Grid>
                            <Grid xs={3}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Stack spacing={3}>
                                        <Typography
                                            component={"p"}>Extant: {state.isExtant ? "Yes" : "No"}</Typography>
                                        <TextField
                                            label={"Year Constructed"}
                                            variant={"outlined"}
                                            sx={{width: "100%"}}
                                            value={state.startYear}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                dispatch({
                                                    type: Action.UPDATE_START_YEAR,
                                                    payload: event.target.value
                                                })
                                            }}
                                        />
                                        <TextField
                                            label={"Year Destroyed"}
                                            variant={"outlined"}
                                            sx={{width: "100%"}}
                                            value={state.endYear}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                dispatch({
                                                    type: Action.UPDATE_END_YEAR,
                                                    payload: event.target.value
                                                })
                                            }}
                                        />
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Stack spacing={3}>
                                        <TextField
                                            label={"Latitude"}
                                            variant={"outlined"}
                                            sx={{width: "100%"}}
                                            value={state.latitude}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                dispatch({
                                                    type: Action.UPDATE_LATITUDE,
                                                    payload: event.target.value
                                                })
                                            }}
                                        />
                                        <TextField
                                            label={"Longitude"}
                                            variant={"outlined"}
                                            sx={{width: "100%"}}
                                            value={state.longitude}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                dispatch({
                                                    type: Action.UPDATE_LONGITUDE,
                                                    payload: event.target.value
                                                })
                                            }}
                                        />
                                        <TextField
                                            label={"Altitute"}
                                            variant={"outlined"}
                                            sx={{width: "100%"}}
                                            value={state.altitude}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                dispatch({
                                                    type: Action.UPDATE_ALTITUDE,
                                                    payload: event.target.value
                                                })
                                            }}
                                        />
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid xs={5}>
                                <AKAControl akas={state.akas}
                                            onAddAKA={() => {

                                            }}
                                            onRemoveAKA={(aka: AKA) => {

                                            }}
                                            onUpdateAKA={(aka: AKA) => {

                                            }}/>
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    label={"Notes"}
                                    variant={"outlined"}
                                    sx={{width: "100%"}}
                                    multiline={true}
                                    value={state.notes}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        dispatch({type: Action.UPDATE_NOTES, payload: event.target.value})
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EditShelterInfo;
