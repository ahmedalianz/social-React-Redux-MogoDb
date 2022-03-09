import React from 'react'
import TopBar from '../../components/topbar/topbar'
import SideBar from "../../components/sidebar/side";
import Feed from "../../components/feed/feed";
import RightBar from "../../components/rightbar/right";
import './home.css'
export default function Home() {
    return (
        <>
            <TopBar />
            <div className="home-container">
                <SideBar />
                <Feed />
                <RightBar />
            </div>
        </>
    )
}
