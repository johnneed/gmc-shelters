import React, {useState, useEffect, Fragment} from "react";
import "./styles.css";
import ShelterFactory from "../../factories/shelter-factory";
import ShelterCard from "../../components/shelter-card/shelter-card";
import {Typography, Button} from "@mui/material";
import {ErrorMessage} from "../../components/error-message";
import Box from "@mui/material/Box";


const updateShelter = (shelter: Shelter) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.api.invoke("UPDATE_SHELTER", shelter).then(function (res: Shelter) {
        // console.log(res, JSON.stringify(res, null, 2));
    })
        .catch(function (err: Error) {
            // console.error(err); // will print "This didn't work!" to the browser console.
        });
}


const MainPage: React.FC = () => {
    const [apiData, setApiData] = useState<Shelter[] | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [selectedShelter, setSelectedShelter] = useState<number | null>(null); // [1

    const selectShelter = (id: number | null) => () => {
        setSelectedShelter(id);
    }

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.api.invoke("READ_SHELTERS").then(function (res: unknown[]) {
            const shelters = res.map((shelter: unknown) => ShelterFactory(shelter));
            setApiData(shelters);
            setApiError(null);
        })
            .catch(function (err: Error) {
                // console.error(err); // will print "This didn't work!" to the browser console.
                setApiError(`ERROR: ${err.message}`);
                setApiData(null);
            });

    }, []);


    return (
        <Box component="main" className="main-page" sx={{p: 3}}>
            {apiError ? (<ErrorMessage message={apiError}/>) : null}
            {apiData ? (
                <div className={"shelters"}>
                    {apiData.map((shelter: Shelter) => (
                        <Fragment key={shelter.id}>
                            <div id={"main-page-a"}/>
                            <ShelterCard shelter={shelter} isEditing={shelter.id === selectedShelter}
                                         onClick={selectShelter(shelter.id)}/>
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
