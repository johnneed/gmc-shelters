import React, {useState, Fragment} from "react";
import "./styles.css";
// import ShelterCard from "../../components/shelter-card/shelter-card";
// import {Typography} from "@mui/material";
// import {ErrorMessage} from "../../components/error-message";
import Box from "@mui/material/Box";


const MainPage: React.FC = () => {
    // const [selectedShelter, setSelectedShelter] = useState<number | null>(null); // [1
    //
    //
    // const selectShelter = (id: number | null) => () => {
    //     setSelectedShelter(id);
    // }


    return (
         <Box component="main" className="main-page" sx={{p: 3}}>
            {/*{sheltersError ? (<ErrorMessage message={sheltersError.message}/>) : null}*/}
            {/*{shelters ? (*/}
            {/*    <div className={"shelters"}>*/}
            {/*        {shelters.map((shelter: Shelter) => (*/}
            {/*            <Fragment key={shelter.id}>*/}
            {/*                <div id={"main-page-a"}/>*/}
            {/*                <ShelterCard shelter={shelter} isEditing={shelter.id === selectedShelter}*/}
            {/*                             onClick={selectShelter(shelter.id)}/>*/}
            {/*            </Fragment>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <Typography variant={"h6"} component={"h6"}>Loading data...</Typography>*/}
            {/*)}*/}
        </Box>
     );
};

export default MainPage;
