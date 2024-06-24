import React, {Fragment} from "react";
import "./styles.css";
import {Card, Box, Chip, TextField, Tooltip, Typography, Stack, Paper} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import {ViewShelterInfo} from "../view-shelter-info";
import {EditShelterInfo} from "../edit-shelter-info"; // Grid version 2


interface ShelterInfoProps {
    shelter: Shelter;
    isSelected?: boolean;
    isEditing?: boolean;
    onClick: () => void;
}


const ShelterCard: React.FC<ShelterInfoProps> = ({shelter, isSelected = false, isEditing = false, onClick}) => {
    return (
        <Card className={isSelected ? "shelter-card_block is_selected" : "shelter-card_block"} onClick={onClick}>
            {
                isEditing ? (
                    <EditShelterInfo shelter={shelter}/>
                ) : (
                    <ViewShelterInfo shelter={shelter}/>
                )}
        </Card>
    );
};

export default ShelterCard;
