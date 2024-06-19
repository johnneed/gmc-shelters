import React, {Fragment, useReducer} from "react";
import "./styles.css";
import {Card, Box, Chip, TextField, Tooltip, Typography, Stack, Paper} from "@mui/material";
import TextArea from "../text-area";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import DefaultShelterImage from "./default-shelter-image";
import {shelterFactory} from "../../factories"; // Grid version 2

interface ShelterInfoProps {
    shelter?: Shelter;
    onSave: (shelter: Shelter) => void;
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
    UPDATE_AKA,
    UPDATE_NOTES
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
        case Action.UPDATE_AKA:
            return {
                ...state,
                aka: action.payload
            };

        case Action.UPDATE_NOTES:
            return {
                ...state,
                notes: action.payload
            };
        default:
            throw Error("Unknown action.");
    }
}

const EditShelterInfo: React.FC<ShelterInfoProps> = ({shelter, onSave}) => {

    const [state, dispatch] = useReducer(reducer, shelter || shelterFactory());

    return (
        <Box className={"edit_shelter_info_block"}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <TextField label={"Name"}
                           variant={"outlined"}
                           value={state.name}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               dispatch({type: Action.UPDATE_NAME, payload: event.target.value})
                           }}/>
                <Tooltip title="Should match the Worpress article slug">
                    <TextField label={"Wordpress Slug"}
                               variant={"outlined"}
                               value={state.slug}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   dispatch({type: Action.UPDATE_SLUG, payload: event.target.value})
                               }}
                    />
                </Tooltip>
            </Box>
            <br/>
            <TextField label={"Description"}
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
                {state.isGMC ? (<Chip color="success" label={"GMC"} size="small"/>) : null}
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
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Typography variant={"h6"}
                                                component={"h6"}>Category: {state.architecture || "None"}</Typography>
                                </Paper>
                            </Grid>
                            <Grid xs={6}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Typography variant={"h6"}
                                                component={"h6"}>Architecture: {state.architecture || "Unknown"}</Typography>
                                </Paper>
                            </Grid>
                            <Grid xs={12}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Typography variant={"h6"}
                                                component={"h6"}>Architect/Engineer: {state.builtBy || "Unknown"}</Typography>
                                </Paper>
                            </Grid>
                            <Grid xs={3}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Stack>
                                        <Typography
                                            component={"p"}>Extant: {state.isExtant ? "Yes" : "No"}</Typography>
                                        <Typography component={"p"}>Built: {state.startYear}</Typography>
                                        <Typography component={"p"}>Destroyed: {state.endYear}</Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Stack>
                                        <Typography display={"inline-block"}
                                                    component={"p"}>
                                            Latitude: {state.latitude}
                                        </Typography>
                                        <Typography display={"inline-block"}
                                                    component={"p"}>
                                            Longitude: {state.longitude}
                                        </Typography>
                                        <Typography display={"inline-block"}
                                                    component={"p"}>
                                            Altitude: {state.altitude}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid xs={5}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Typography component={"p"} sx={{fontWeight: "500"}}>AKAs</Typography>
                                    {
                                        state.aka.map((aka) => (
                                            <Typography key={aka.id} component={"p"}>{aka.name}</Typography>
                                        ))
                                    }
                                </Paper>
                            </Grid>
                            <Grid xs={12}>
                                <Typography component={"p"}>Notes:</Typography>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Typography component={"p"}>{state.notes}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
        ;
};

export default EditShelterInfo;
