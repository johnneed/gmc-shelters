import React, {useState} from "react";
import "./styles.css"; // You can create your own CSS file for styling
import {TopAppBar} from "../top-app-bar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}: LayoutProps) => (
    <div className="app-container">
        <TopAppBar/>
        <div className="main-container">
            <main className="main-window">
                {children}
            </main>
        </div>
    </div>
);


export default Layout;
