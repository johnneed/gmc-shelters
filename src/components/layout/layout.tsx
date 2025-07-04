import React, {useState} from "react";
import "./styles.css"; // You can create your own CSS file for styling
import {TopAppBar} from "../top-app-bar";
import {CBox,  Tooltip, Typography, Stack, Paper, Drawer} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";


const drawerWidth = 240;


interface LayoutProps {
    children: React.ReactNode;
}





const Layout: React.FC<LayoutProps> = ({children}: LayoutProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {setIsMenuOpen(!isMenuOpen);};
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenu}>
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <div className="app-container">
            <TopAppBar onMenuClick={toggleMenu}/>
            <div className="main-container">
                <Drawer
                    open={isMenuOpen}
                    onClose={toggleMenu}
                    anchor={"right"}
                >
                    <Toolbar />
                    {DrawerList}
                </Drawer>
                <main className="main-window">
                    {children}
                </main>
            </div>
        </div>
    );
};


export default Layout;
