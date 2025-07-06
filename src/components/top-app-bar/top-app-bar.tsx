import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {CssBaseline, IconButton, Toolbar, Button,alpha, InputBase, styled} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./styles.css";
import {useNavigate, useLocation} from "react-router-dom";
import {setFilter, clearFilter, selectFilter} from "../../store/slices/ui.slice";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {ChangeEvent} from "react";
import {debounce} from "../../lib/debounce";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    onMenuClick?: () => void;
}

const navItems = [{text: "Shelters", link: "/"}, {text: "Map", link: "/map"}];

export default function TopAppBar(props: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const updateFilter = debounce((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const searchString = (e.target as HTMLInputElement).value;
        console.log("SEARCH_STRING", searchString);
        if (searchString.length === 0) {
            dispatch(clearFilter());
        } else {
            dispatch(setFilter(searchString));
        }
    });

    const clearSearchFilter = () => {
        dispatch(clearFilter());
        // Optionally, you can also clear the input field if needed
        const inputElement = document.querySelector("input[aria-label=\"search\"]");
        if (inputElement) {
            (inputElement as HTMLInputElement).value = "";
        }
    }

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

    const ClearFilterWrapper = styled("div")(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: 0,
        top: 0,
        zIndex: 100
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            paddingRight: `calc(1em + ${theme.spacing(4)})`,
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
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={updateFilter}
                            placeholder="Search…"
                            inputProps={{"aria-label": "search"}}
                        />
                        <ClearFilterWrapper>
                            <IconButton
                                size="small"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{mr: 2}}
                                onClick={clearSearchFilter}
                            >
                                <ClearIcon/>
                            </IconButton>
                        </ClearFilterWrapper>
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
