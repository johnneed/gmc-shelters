import React, {ChangeEvent} from "react";
import "./styles.css";
import {
    Divider,
    Box,
    FormControlLabel,
    Typography,
    Stack,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Switch,
    TextField,
    Tooltip, SelectChangeEvent
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DefaultShelterImage from "./default-shelter-image";
import {shelterFactory} from "../../factories"; // Grid version 2
import {
    selectCategories,
    selectArchitectures,
    updateActiveShelter
} from "../../store/slices/shelters.slice";
import AKAControl from "../aka-control/aka-control";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

interface ShelterInfoProps {
    shelter?: Shelter;
}

const isNum = (num: string): boolean => {
    const regex = /[^0-9.-]/g;
    return !regex.test(num) || num === "";
}

const isYear = (num: string) => {
    const regex = /[^0-9]/g;
    return !regex.test(num) || num === "";
}

const EditShelterInfo: React.FC<ShelterInfoProps> = ({shelter}) => {
    const categories = useAppSelector(selectCategories);
    const architectures = useAppSelector(selectArchitectures)
    const dispatch = useAppDispatch();

    const handleUpdate = (key: string, validation?: (a: any) => boolean) => (event: ChangeEvent | SelectChangeEvent<any>, child?: React.ReactNode) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value = event.target.value;
        if (!validation || validation(value)) {
            console.log("UPDATING", key, value)
            dispatch(updateActiveShelter({[key]: value}));
        }
    };


    return (
        <Box className={"edit_shelter_info_block"}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <TextField
                    label={"Name"}
                    variant={"outlined"}
                    defaultValue={shelter.name || ""}
                    onChange={handleUpdate("name")}
                />
                <Tooltip title="Should match the Worpress article slug">
                    <TextField
                        label={"Wordpress Slug"}
                        variant={"outlined"}
                        defaultValue={shelter.slug || ""}
                        onChange={handleUpdate("slug")}
                    />
                </Tooltip>
            </Box>
            <br/>
            <TextField
                label={"Description"}
                variant={"outlined"}
                sx={{width: "100%"}}
                multiline={true}
                defaultValue={shelter.description || ""}
                onChange={handleUpdate("description")}
            />
            <br/>
            <Divider className={"edit_shelter_info_divider"} textAlign="right">
                <FormControlLabel
                    control={
                        <Switch color={"success"}
                                checked={shelter.isGMC || false}
                                onChange={handleUpdate("isGMC")}
                        />
                    }
                    label="Is GMC Shelter"/>
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
                                        value={shelter.category || ""}
                                        onChange={handleUpdate("category")}
                                    >
                                        {
                                            (categories || []).map(category => (
                                                <MenuItem key={category.id}
                                                          selected={category.name === shelter.category}
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
                                        value={shelter.architecture || ""}
                                        label="Architecture"
                                        onChange={handleUpdate("architecture")}
                                    >
                                        {
                                            (architectures || []).map(architecture => (
                                                <MenuItem key={architecture.id}
                                                          selected={architecture.name === shelter.architecture}
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
                                        value={shelter.builtBy || ""}
                                        onChange={handleUpdate("builtBy")}
                                    />
                                </Paper>
                            </Grid>
                            <Grid xs={3}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Stack spacing={3}>
                                        <Typography
                                            component={"p"}>Extant: {shelter.isExtant ? "Yes" : "No"}</Typography>
                                        <TextField
                                            label={"Year Constructed"}
                                            variant={"outlined"}
                                            sx={{width: "100%"}}
                                            value={shelter.startYear?.toString() || ""}
                                            onChange={handleUpdate("startYear", isNum)}
                                            error={!isNum(shelter.startYear.toString() || "")}
                                        />
                                        <TextField
                                            label={"Year Destroyed"}
                                            variant={"outlined"}
                                            sx={{width: "100%"}}
                                            defaultValue={shelter.endYear?.toString() || ""}
                                            onChange={handleUpdate("endYear", isYear)}
                                            error={!isYear(shelter.endYear.toString())}
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
                                            value={shelter.latitude?.toString() || ""}
                                            onChange={handleUpdate("latitude", isNum)}
                                            error={!isNum(shelter.latitude.toString())}
                                        />
                                        <TextField
                                            label={"Longitude"}
                                            variant={"outlined"}
                                            sx={{width: "100%"}}
                                            value={shelter.longitude?.toString() || ""}
                                            onChange={handleUpdate("longitude", isNum)}
                                            error={!isNum(shelter.longitude.toString())}
                                        />
                                        <TextField
                                            label={"Altitute"}
                                            variant={"outlined"}
                                            sx={{width: "100%"}}
                                            defaultValue={shelter.altitude?.toString() || ""}
                                            onChange={handleUpdate("altitude", isNum)}
                                            error={!isNum(shelter.altitude.toString())}
                                        />
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid xs={5}>
                                <AKAControl akas={shelter.akas}
                                            shelterId={shelter.id}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    label={"Notes"}
                                    variant={"outlined"}
                                    sx={{width: "100%"}}
                                    multiline={true}
                                    defaultValue={shelter.notes || ""}
                                    onChange={handleUpdate("notes")}
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
