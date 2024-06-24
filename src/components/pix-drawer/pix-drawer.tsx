import * as React from "react";
import {Global} from "@emotion/react";
import {styled} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {grey} from "@mui/material/colors";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
import Drawer from "@mui/material/Drawer";

const drawerBleeding = 56;

interface PixDrawerProps {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    isOpen: boolean;
    searchResults: Shelter[],
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Root = styled("div")(({theme}) => ({
    height: "100%",
    backgroundColor:
        theme.palette.mode === "light" ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.mode === "light" ? "#eee" : grey[800],
}));

const Puller = styled("div")(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

const PixDrawer = ({window, isOpen, searchResults = [], toggleDrawer}: PixDrawerProps) => {


    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            <CssBaseline/>
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />
            <Drawer
                container={container}
                anchor="bottom"
                open={isOpen}
                onClose={toggleDrawer(false)}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: "absolute",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                        zIndex: 100
                    }}
                    onClick={toggleDrawer(true)}

                >
                    <Puller/>
                    <Typography sx={{p: 2, color: "text.secondary"}}>{searchResults.length} results</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: "100%",
                        overflow: "auto",
                    }}
                >
                    <Skeleton variant="rectangular" height="100%"/>
                </StyledBox>
            </Drawer>
        </Root>
    );
}


export default PixDrawer