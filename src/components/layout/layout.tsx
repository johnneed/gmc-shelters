import React, {useState} from "react";
import "./styles.css"; // You can create your own CSS file for styling
import {TopAppBar} from "../top-app-bar";
import {SearchResultsDrawer} from "../search-results-drawer";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
    const toggleSearchBox = (open: boolean) => () => {
        if (open !== isSearchBoxOpen) {
            setIsSearchBoxOpen(open);
        }
    }

    return (
        <div className="app-container">
            <TopAppBar onMenuClick={() => {
                setIsSearchBoxOpen(true);
            }}/>
            <div className="main-container">
                <SearchResultsDrawer toggleDrawer={toggleSearchBox} isOpen={isSearchBoxOpen} searchResults={[]}/>
                <main className="main-window">
                    {children}
                </main>
            </div>
        </div>
    )
        ;
};

export default Layout;
