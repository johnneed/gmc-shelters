import React, {Fragment} from "react";
import "./styles.css";
import {Card, Box, Chip, TextField, Tooltip, Typography, Stack, Paper} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import DefaultShelterImage from "./default-shelter-image"; // Grid version 2


interface ShelterInfoProps {
    shelter: Shelter;
    isSelected?: boolean;
}


const openLink = (url: string) => () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.api.invoke("OPEN_IN_DEFAULT_BROWSER", url).then(function (res: unknown[]) {
        // console.log(res);
    })
        .catch(function (err: Error) {
            // console.error(err);
        });
};


const ViewShelterInfo: React.FC<ShelterInfoProps> = ({shelter, isSelected = false}) => {
    console.log("Shelter: ", shelter);

    return (
        <Box className={isSelected ? "view_shelter_info_block is_selected" : "view_shelter_info_block"}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant={"h4"} component={"h4"}>{shelter.name}</Typography>
                <Box display={"flex"} justifyContent={"flex-start"}>
                    <Paper variant={"outlined"} sx={{padding: "0.5rem"}}>
                        <Tooltip title="View Web Artcle">
                            <Typography
                                onClick={openLink(`https://gmcburlington.org/${shelter.slug}/`)}
                                display={"inline-block"}
                                sx={{marginRight: "1rem"}}
                            >{shelter.slug}
                            </Typography>
                        </Tooltip>
                    </Paper>
                </Box>
            </Box>
            <br/>
            <Typography component={"p"}>{shelter.description}</Typography>
            <br/>
            <Divider className={"view_shelter_info_divider"} textAlign="right">
                {shelter.isGMC ? (<Chip color="success" label={"GMC"} size="small"/>) : null}
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
                                                component={"h6"}>Category: {shelter.architecture || "None"}</Typography>
                                </Paper>
                            </Grid>
                            <Grid xs={6}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Typography variant={"h6"}
                                                component={"h6"}>Architecture: {shelter.architecture || "Unknown"}</Typography>
                                </Paper>
                            </Grid>
                            <Grid xs={12}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Typography variant={"h6"}
                                                component={"h6"}>Architect/Engineer: {shelter.builtBy || "Unknown"}</Typography>
                                </Paper>
                            </Grid>
                            <Grid xs={3}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Stack>
                                        <Typography
                                            component={"p"}>Extant: {shelter.isExtant ? "Yes" : "No"}</Typography>
                                        <Typography component={"p"}>Built: {shelter.startYear}</Typography>
                                        <Typography component={"p"}>Destroyed: {shelter.endYear}</Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Stack>
                                        <Typography display={"inline-block"}
                                                    component={"p"}>
                                            Latitude: {shelter.latitude}
                                        </Typography>
                                        <Typography display={"inline-block"}
                                                    component={"p"}>
                                            Longitude: {shelter.longitude}
                                        </Typography>
                                        <Typography display={"inline-block"}
                                                    component={"p"}>
                                            Altitude: {shelter.altitude}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid xs={5}>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Typography component={"p"} sx={{fontWeight: "500"}}>AKAs</Typography>
                                    {
                                        shelter.akas.map((aka: AKA) => (
                                            <Typography key={aka.id} component={"p"}>{aka.name}</Typography>
                                        ))
                                    }
                                </Paper>
                            </Grid>
                            <Grid xs={12}>
                                <Typography component={"p"}>Notes:</Typography>
                                <Paper sx={{padding: "0.5rem"}} variant="outlined">
                                    <Typography component={"p"}>{shelter.notes}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ViewShelterInfo;
