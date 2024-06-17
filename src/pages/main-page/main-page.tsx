import React, {useState, useEffect} from "react";
import "./styles.css";
import ShelterFactory from "../../factories/shelter-factory";
import ShelterInfo from "../../components/shelter-info/shelter-info";
import {Typography} from "@mui/material";
import {ErrorMessage} from "../../components/error-message";
import Box from "@mui/material/Box";


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
            console.log(res, JSON.stringify(res, null, 2));
            const shelters = res.map((shelter: unknown) => ShelterFactory(shelter));
            console.log(shelters, JSON.stringify(shelters, null, 2));
            setApiData(shelters);
            setApiError(null);
        })
            .catch(function (err: Error) {
                console.error(err); // will print "This didn't work!" to the browser console.
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
                        <ShelterInfo key={shelter.id} shelter={shelter} isSelected={shelter.id === selectedShelter}
                                     selectShelter={selectShelter(shelter.id)}/>
                    ))}
                </div>
            ) : (
                <Typography variant={"h1"} component={"h1"}>Loading data...</Typography>
            )}
        </Box>
    );
};

export default MainPage;
