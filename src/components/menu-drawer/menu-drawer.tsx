import * as React from "react";
import Drawer, {DrawerProps} from "@mui/material/Drawer";
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

;
import {useNavigate} from "react-router-dom";
import AboutItem from "./menu-items/about-item/about-item";
import UpdatePhotosItem from "./menu-items/update-photos-item/update-photos";

interface menuDrawerProps extends DrawerProps {
    open?: boolean;
    toggleMenu?: (value?: boolean) => () => void;
}

const MenuDrawer = ({open, toggleMenu, ...rest}: menuDrawerProps) => {

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
                    <AboutItem/>
                    <UpdatePhotosItem/>
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
