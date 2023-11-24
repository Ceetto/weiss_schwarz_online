import React from "react";
import styles from "./Sidebar.module.css"
import LoginFields from "./LoginFields/LoginFields";

interface SidebarProps {
    screen: string, // login, register or navbar
}

function Sidebar(props: SidebarProps){
    return (
        <div id={styles['navbar']}>
            <div id={styles['logo']}>
                <img id={styles['logo_img']} src={'/assets/logo/ws_logo.png'} alt={'logo'}/>
            </div>

            <div id={styles['middle']}>
                <SidebarInside screen={props.screen}></SidebarInside>
            </div>

            <div id={styles['bottom']}>

            </div>

        </div>
    )
}

interface SidebarInsideProps{
    screen: string, // login, register or navbar
}

function SidebarInside(props: SidebarInsideProps){
    switch(props.screen){
        case 'login': {
            return(
                <LoginFields></LoginFields>
            )
        }
        case 'register': {
            return(
                <div></div>
            )
        }
        case 'navbar': {
            return(
                <div></div>
            )
        }
        default: {
            return(
                <div>
                    <p>Error, wrong sidebar screen type</p>
                </div>
            )
        }
    }

}

export default Sidebar;