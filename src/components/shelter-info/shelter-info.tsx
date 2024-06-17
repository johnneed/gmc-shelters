import React, {Fragment} from "react";
import "./styles.css";
import {Card, Box, Chip, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import { shell} from "electron";
import ShelterFactory from "../../factories/shelter-factory";


interface ShelterInfoProps {
    shelter: Shelter;
    isSelected?: boolean;
    isEditing?: boolean;
    selectShelter: () => void;
}



const openLink = (url: string) => () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.api.invoke("OPEN_IN_DEFAULT_BROWSER", url).then(function (res: unknown[]) {
        console.log(res);
    })
        .catch(function (err: Error) {
            console.error(err);
        });
};


const ShelterInfo: React.FC<ShelterInfoProps> = ({shelter, isSelected = false, isEditing = false, selectShelter}) => {


    return (
        <Card className={isSelected ? "shelter-info_block is_selected" : "shelter-info_block"} onClick={selectShelter}>
            {isEditing ? (
                <Box>
                    <TextField id="name" label="Name" variant="outlined" value={shelter.name}/>
                </Box>
            ) : (<Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant={"h4"} component={"h4"}>{shelter.name}</Typography>

                    <Box display={"flex"} justifyContent={"flex-start"}>
                        <Typography
                            onClick={openLink(`https://gmcburlington.org/${shelter.slug}/`)}
                            display={"inline-block"}
                            sx={{marginRight: "1rem"}}
                        >{shelter.slug}
                        </Typography>
                        {shelter.isGMC ? (<Chip color="success" label={"GMC"} size="small"/>) : null}
                    </Box>
                </Box>
                <br/>
                <Typography component={"p"}>{shelter.description}</Typography>
                <br/>
                <Divider/>
                <br/>
                <Typography variant={"h5"} component={"h3"}>category: {shelter.architecture}</Typography>
                <Typography variant={"h5"} component={"h3"}>built by: {shelter.builtBy}</Typography>
                <Typography variant={"h5"} component={"h3"}>{shelter.notes}</Typography>
                <Typography variant={"h5"} component={"h3"}>{shelter.startYear}</Typography>
                <Typography variant={"h5"} component={"h3"}>{shelter.endYear}</Typography>
                <Box>
                    <Typography display={"inline-block"} margin={"1rem"} variant={"h6"}
                                component={"h5"}>Latitude: {shelter.latitude}</Typography>
                    <Typography display={"inline-block"} margin={"1rem"} variant={"h6"}
                                component={"h3"}>Longitude: {shelter.longitude}</Typography>
                    <Typography display={"inline-block"} margin={"1rem"} variant={"h6"}
                                component={"h3"}>Altitude: {shelter.altitude}</Typography>
                </Box>
                <Typography variant={"h5"} component={"h3"}>{shelter.defaultPhotoId}</Typography>
            </Box>)}
        </Card>
    );
};

export default ShelterInfo;
