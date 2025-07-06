import React from "react";
import "./styles.css";
import {Box, Button, Card, CardActions, Typography} from "@mui/material";
import {ViewShelterInfo} from "../view-shelter-info";
import EditIcon from "@mui/icons-material/Edit";


interface ShelterInfoProps {
    shelter: Shelter;
    isSelected?: boolean;
    activeShelter: Shelter | null;
    onClick: () => void;
}


const ShelterCard: React.FC<ShelterInfoProps> = ({shelter, isSelected = false, activeShelter, onClick}) => {
    // const isEditing = Boolean(activeShelter && (activeShelter?.id === shelter.id));
    return (
        <Box id={`shelter-card_${shelter.id}`} sx={{paddingTop: "0.1rem"}}>
            <Card className={isSelected ? "shelter-card_block is_selected" : "shelter-card_block"} onClick={onClick}>
                <ViewShelterInfo shelter={shelter}/>
                <CardActions sx={{justifyContent: "flex-end"}}>
                    <Button size="small"><EditIcon fontSize="inherit"/>{" "}<Typography>Edit</Typography></Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default ShelterCard;
