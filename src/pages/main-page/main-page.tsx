import React, {useState, Fragment, useEffect, Suspense, useMemo} from "react";
import "./styles.css";
import ShelterCard from "../../components/shelter-card/shelter-card";
import {ErrorMessage} from "../../components/error-message";
import Box from "@mui/material/Box";
import {ERequestStatus} from "../../common/request";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Button, Divider, IconButton, Stack, Typography} from "@mui/material";

const MainPage: React.FC = () => {
    const shelters = useAppSelector(selectShelters);
    const sheltersStatus = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    const activeShelter = useAppSelector(selectActiveShelter);
    console.log("ACTIVE SHELTER", activeShelter)
    const filter: string | null = useAppSelector(selectFilter);
    const scrollToRef = React.useRef<HTMLDivElement>(null);
    const editShelter = (shelter: Shelter | null) => () => {
        if (shelter) {
            dispatch(activateShelter(shelter));
        }
    }


    const findShelter = (shelter: Shelter) => () => {
        const element = document.getElementById(`shelter-card_${shelter.id}`);
        element.scrollIntoView({behavior: "smooth", block: "start"});
    };

    const filteredShelters = useMemo(() => {
        return shelters.filter(shelter => {
            if (!filter) {
                return true;
            }
            const searchString = filter.toLowerCase();
            return shelter.name.toLowerCase().includes(searchString)
        });
    }, [filter, shelters]);

    const addShelter = () => {
    }
    const closeIndex = () => {
    }

    useEffect(() => {
        dispatch(fetchShelters());
        dispatch(fetchCategories());
        dispatch(fetchArchitectures());
    }, []);

    return (
        <Stack direction={"row"} className="main-page-container" sx={{height: "100%"}}>
            <Box component="aside" sx={{
                flex: "1 0 10rem",
                bgColor: "#f5f5f5",
                height: "100%",
                overflowY: "auto"
            }}>
                <Stack className={"shelter-names"} sx={{paddingTop: "2.2rem"}}>
                    {(filteredShelters).map((shelter: Shelter) => (
                            <Button
                                sx={{border: "solid 1px #DDD", borderBottom: "none", borderRadius: "0", margin: "0 0.3rem"}}
                                size={"small"}
                                variant="text"
                                key={shelter.id}
                                className="shelter-index_name-button"
                                onClick={findShelter(shelter)}>
                                <Typography fontSize={"0.75rem"}>{shelter.name}</Typography>
                            </Button>
                    ))}
                </Stack>
            </Box>
            <Box component="main" className="main-page"
                 sx={{flex: "1, 1, auto", p: 3, height: "100%", overflowY: "auto"}} ref={scrollToRef}>
                {sheltersStatus === ERequestStatus.LOADING ? (<Loader/>) : null}
                {sheltersStatus === ERequestStatus.FAILED ? (<ErrorMessage message={"Something went wrong"}/>) : null}
                {sheltersStatus === ERequestStatus.SUCCEEDED ? (
                    <div className={"shelters"}>
                        {(shelters).map((shelter: Shelter) => (
                            <ShelterCard key={shelter.id} shelter={shelter} activeShelter={activeShelter}
                                         onClick={editShelter(shelter)}/>
                        ))}
                    </div>
                ) : null}
            </Box>
        </Stack>
    );
};

export default MainPage;
