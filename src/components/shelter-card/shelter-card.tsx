import React from "react";
import "./styles.css";
import {Card} from "@mui/material";
import {ViewShelterInfo} from "../view-shelter-info";
import {EditShelterInfo} from "../edit-shelter-info"; // Grid version 2


interface ShelterInfoProps {
    shelter: Shelter;
    isSelected?: boolean;
    activeShelter: Shelter | null;
    onClick: () => void;
}


const ShelterCard: React.FC<ShelterInfoProps> = ({shelter, isSelected = false, activeShelter, onClick}) => {
    const isEditing = Boolean(activeShelter && (activeShelter?.id === shelter.id));
    return (
        <Card className={isSelected ? "shelter-card_block is_selected" : "shelter-card_block"} onClick={onClick}>
            {
                isEditing ? (
                    <EditShelterInfo shelter={activeShelter}/>
                ) : (
                    <ViewShelterInfo shelter={shelter}/>
                )}
        </Card>
    );
};

export default ShelterCard;
