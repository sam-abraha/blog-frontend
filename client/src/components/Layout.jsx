import { Outlet } from "react-router-dom"
import Header from './Header'
import React from 'react';
export default function Layout() {
    return (
        <main>
            <Header/>
            <Outlet/>
        </main>

    )
}