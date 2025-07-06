import {useNavigate} from "react-router-dom";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";


const AboutItem = () => {
    const navigate = useNavigate();
    return (
        <ListItem disablePadding onClick={() => {
            console.log("About clicked");
            navigate("/about");
        }}>
            <ListItemButton>
                <ListItemIcon>
                    <InfoIcon/>
                </ListItemIcon>
                <ListItemText primary={"About"}/>
            </ListItemButton>
        </ListItem>    );
    };

export default AboutItem;
