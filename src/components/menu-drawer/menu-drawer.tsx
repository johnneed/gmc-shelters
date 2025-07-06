import * as React from "react";
import Drawer, {DrawerProps} from "@mui/material/Drawer";
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InfoIcon from "@mui/icons-material/Info";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


interface menuDrawerProps extends DrawerProps {
    open?: boolean;
    toggleMenu?: (value?: boolean) => () => void;
}

const MenuDrawer = ({open, toggleMenu, ...rest}: menuDrawerProps) => {



    const navigate = useNavigate();


    return (
        <Drawer
            open={open}
            {...rest}
            anchor={"right"}
        >
            <Toolbar/>
            <Box sx={{width: 250}}
                 role="presentation"
                 onClick={toggleMenu(false)}>
                <List>
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
                    </ListItem>
                    <ListItem disablePadding onClick={() => console.log("Update Photos clicked")}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PhotoCameraIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Update Photos"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
        ;
}


export default MenuDrawer
