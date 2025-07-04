import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.css";
import {alpha, InputBase, styled} from "@mui/material";
import {useNavigate,useLocation} from "react-router-dom";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    onMenuClick?: () => void;
}

const drawerWidth = 240;
const navItems = [{text: "Shelters", link: "/"}, {text: "Map", link: "/map"}, {text: "About", link: "/about"}];

export default function TopAppBar(props: Props) {
    const navigate = useNavigate();

    const Search = styled("div")(({theme}) => ({
        flexGrow: 1,
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    }));

    const SearchIconWrapper = styled("div")(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "20ch",
            },
        },
    }));

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <AppBar component="nav">

                <Toolbar variant="dense">
                    <Box sx={{flexGrow: 0}}>
                        {navItems.map((item) => (
                            <Button
                                key={item.text}
                                sx={{color: "#fff"}}
                                onClick={() => {
                                    navigate(item.link);
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                    {/*<Typography*/}
                    {/*    variant="h6"*/}
                    {/*    component="div"*/}
                    {/*    sx={{flexGrow: 0, display: {xs: "none", sm: "none", "md": "block"}}}*/}
                    {/*>*/}
                    {/*    GMC SHELTERS*/}
                    {/*</Typography>*/}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{"aria-label": "search"}}
                        />
                    </Search>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={props.onMenuClick}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
