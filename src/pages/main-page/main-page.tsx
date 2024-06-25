import React, {useState, Fragment, useEffect} from "react";
import "./styles.css";
import ShelterCard from "../../components/shelter-card/shelter-card";
import {Typography} from "@mui/material";
import {ErrorMessage} from "../../components/error-message";
import Box from "@mui/material/Box";
import {ERequestStatus} from "../../common/request";

import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {
    selectShelters,
    selectStatus,
    fetchShelters,
    selectedActiveShelterId,
    activateShelter,
    fetchCategories,
    fetchArchitectures
} from "../../store/slices/shelters.slice";

const MainPage: React.FC = () => {
    const shelters = useAppSelector(selectShelters);
    const sheltersStatus = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    const activeShelterId = useAppSelector(selectedActiveShelterId);
    const editShelter = (id:number | null) => () => {
        dispatch(activateShelter(id));
    }

    useEffect(() => {
        dispatch(fetchShelters());
        dispatch(fetchCategories());
        dispatch(fetchArchitectures());
    }, []);
    return (
        <Box component="main" className="main-page" sx={{p: 3}}>
            <h1>MAIN PAGE</h1>
            {sheltersStatus === ERequestStatus.FAILED ? (<ErrorMessage message={"Something went wrong"}/>) : null}
            {shelters ? (
                <div className={"shelters"}>
                    {(shelters).map((shelter: Shelter) => (
                        <Fragment key={shelter.id}>
                            <div id={"main-page-a"}/>
                            <ShelterCard shelter={shelter} isEditing={shelter.id === activeShelterId}
                                         onClick={editShelter(shelter.id)}/>
                        </Fragment>
                    ))}
                </div>
            ) : (
                <Typography variant={"h6"} component={"h6"}>Loading data...</Typography>
            )}
        </Box>
    );
};

export default MainPage;
