import React, {useState, Fragment, useEffect, Suspense, useMemo} from "react";
import "./styles.css";
import ShelterCard from "../../components/shelter-card/shelter-card";
import {ErrorMessage} from "../../components/error-message";
import Box from "@mui/material/Box";
import {ERequestStatus} from "../../common/request";

import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {
    selectShelters,
    selectStatus,
    fetchShelters,
    selectActiveShelter,
    activateShelter,
    fetchCategories,
    fetchArchitectures
} from "../../store/slices/shelters.slice";
import {Loader} from "../../components/loader";
import {selectFilter} from "../../store/slices/ui.slice";

const MainPage: React.FC = () => {
    const shelters = useAppSelector(selectShelters);
    const sheltersStatus = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    const activeShelter = useAppSelector(selectActiveShelter);
    console.log("ACTIVE SHELTER", activeShelter)
    const filter: string | null = useAppSelector(selectFilter);

    const editShelter = (shelter: Shelter | null) => () => {
        if(shelter) {
            dispatch(activateShelter(shelter));
        }
    }


    const filteredShelters = useMemo(()=> {
        return shelters.filter(shelter => {
            if (!filter) {
                return true;
            }
            const searchString = filter.toLowerCase();
            return shelter.name.toLowerCase().includes(searchString)
        });
    }, [filter, shelters]);

    useEffect(() => {
        dispatch(fetchShelters());
        dispatch(fetchCategories());
        dispatch(fetchArchitectures());
    }, []);

    return (
        <Box component="main" className="main-page" sx={{p: 3}}>
            {sheltersStatus === ERequestStatus.LOADING ? (<Loader/>) : null}
            {sheltersStatus === ERequestStatus.FAILED ? (<ErrorMessage message={"Something went wrong"}/>) : null}
            {sheltersStatus === ERequestStatus.SUCCEEDED ? (
                <div className={"shelters"}>
                    {(filteredShelters).map((shelter: Shelter) => (
                        <ShelterCard key={shelter.id} shelter={shelter} activeShelter={activeShelter} onClick={editShelter(shelter)}/>
                    ))}
                </div>
            ) : null}
        </Box>
    );
};

export default MainPage;
