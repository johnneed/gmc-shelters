import React, {useState} from "react";
import "./styles.css"; // You can create your own CSS file for styling
import {TopAppBar} from "../top-app-bar";
import {MenuDrawer} from "../menu-drawer";
import {
    CssBaseline,
    Box,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";

interface LayoutProps {
    children: React.ReactNode;
}


const Layout: React.FC<LayoutProps> = ({children}: LayoutProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = (value?: boolean) => () => {
        if (value === undefined) {
            setIsMenuOpen(!isMenuOpen);
        } else {
            setIsMenuOpen(value);
        }
    };

    return (
        <Box className="app-container">
            <CssBaseline/>
            <TopAppBar onMenuClick={toggleMenu()}/>
            <MenuDrawer open={isMenuOpen} toggleMenu={toggleMenu} onClose={toggleMenu(false)}/>
            <div className="main-window-container">
                {children}
            </div>
        </Box>
    );
};


export default Layout;
