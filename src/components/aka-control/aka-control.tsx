import React from "react";
import "./styles.css";
import {Typography, Paper, List, Icon, ListItem, Button, TextField, IconButton} from "@mui/material";
import { Delete } from "@mui/icons-material";


interface AKAControlProps {
    akas?: AKA[];
    onAddAKA?: () => void;
    onRemoveAKA?: (aka:AKA) => void;
    onUpdateAKA?: (aka: AKA) => void;
}

const AKAControl: React.FC<AKAControlProps> = ({akas, onUpdateAKA, onAddAKA, onRemoveAKA}: AKAControlProps) => {

    const handleNameUpdate = (aka: AKA) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onUpdateAKA) {
            onUpdateAKA({...aka, name: e.target.value});
        }
    }

    const handleNotesUpdate = (aka: AKA) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onUpdateAKA) {
            onUpdateAKA({...aka, notes: e.target.value});
        }
    }
    const handleDelete = (aka: AKA) => () => {
        if (onRemoveAKA) {
            onRemoveAKA(aka);
        }
    }

    return (
        <Paper className="aka-control">
            <Typography variant="h6">Also Known As</Typography>
            <List>
                {akas?.map((aka, index) => (
                    <ListItem key={index}>
                        <TextField
                            label="Name"
                            value={aka.name}
                            onChange={handleNameUpdate(aka)}
                        />
                        <TextField
                            label="Notes"
                            value={aka.notes}
                            onChange={handleNotesUpdate(aka)}
                        />
                        <IconButton
                            onClick={handleDelete(aka)}
                        >
                            <Delete  />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Button onClick={onAddAKA}>Add AKA</Button>
        </Paper>
    );
};

export default AKAControl;
