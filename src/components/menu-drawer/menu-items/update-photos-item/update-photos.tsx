import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";


const UpdatePhotosItem = () => {
    return (
        <ListItem disablePadding onClick={() => console.log("Update Photos clicked")}>
            <ListItemButton>
                <ListItemIcon>
                    <PhotoCameraIcon/>
                </ListItemIcon>
                <ListItemText primary={"Update Photos"}/>
            </ListItemButton>
        </ListItem>
    );
    };

export default UpdatePhotosItem;
