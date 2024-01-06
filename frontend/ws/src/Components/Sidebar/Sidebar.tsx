import React, {useRef} from "react";
import NavbarMobile from "./Navbar/NavbarMobile";
import Navbar from "./Navbar/Navbar";

import styles from "./Sidebar.module.css"

function Sidebar(){
    const windowWidth = useRef(window.innerWidth);
    if (windowWidth.current >= 900){
        return (
            <div id={styles['navbar']}>
                <div id={styles['logo']}>
                    <img id={styles['logo_img']} src={'/assets/logo/ws_logo.png'} alt={'logo'}/>
                </div>

                <div id={styles['middle']}>
                    <Navbar></Navbar>
                </div>

                <div id={styles['bottom']}>

                </div>

            </div>
        )
    } else {
        return (
            <div id={styles['navbar_mobile']}>
                <div id={styles['middle']}>
                    <NavbarMobile></NavbarMobile>
                </div>
            </div>
        )
    }

}

export default Sidebar;