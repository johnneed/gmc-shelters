import React, {ChangeEvent} from "react";
import "./styles.css";
import {Typography, Paper, TextField, IconButton, Stack, SelectChangeEvent} from "@mui/material";
import {Delete, Add} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {akaFactory} from "../../factories";
import {addAKA} from "../../store/slices/shelters.slice";

interface AKAControlProps {
    akas?: AKA[];
    shelterId?: number;
}

const AKAControl: React.FC<AKAControlProps> = ({akas = []}: AKAControlProps) => {

    const handleNameUpdate = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAKA = {...akas[index], name: e.target.value};
        // onChange({target: {value: newAKAs}});
    }

    const handleNotesUpdate = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAKAs = akas.map((a, i) => (i === index ? {...a, notes: e.target.value} : a));
        // onChange({target: {value: newAKAs}});
    }
    const handleDelete = (index: number) => () => {
        const newAKAs = akas.filter((a, i) => i !== index);
        // onChange({target: {value: newAKAs}});
    }

    const handleAddAKA = () => {
        const newAKAs = [...akas, akaFactory({name: "", notes: ""})];
        // onChange({target: {value: newAKAs}});
    }

    return (
        <Paper className="aka-control">
            <Stack direction={"row"} spacing={2}>
                <Typography variant="h6">Also Known As</Typography>
                <IconButton onClick={handleAddAKA}><Add/></IconButton>

            </Stack>
            <Stack spacing={3}>
                {akas?.map((aka, index) => (
                    <Box key={index}>
                        <Stack spacing={1} justifyContent={"space-between"}>
                            <div>
                                <TextField
                                    size={"small"}
                                    label="Name"
                                    value={aka.name}
                                    onChange={handleNameUpdate(index)}
                                />
                                <IconButton
                                    size={"small"}
                                    onClick={handleDelete(index)}
                                >
                                    <Delete/>
                                </IconButton>
                            </div>
                            <TextField
                                size={"small"}
                                label="Notes"
                                multiline={true}
                                value={aka.notes}
                                onChange={handleNotesUpdate(index)}
                            />
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
};

export default AKAControl;
