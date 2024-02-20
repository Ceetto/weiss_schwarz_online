import React, {useEffect, useState} from "react";
import NavbarMobile from "./Navbar/NavbarMobile";
import Navbar from "./Navbar/Navbar";

import styles from "./Sidebar.module.css"

function Sidebar(){
    // let windowWidth = useRef(window.innerWidth);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const windowWidthHandler = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", windowWidthHandler)

        return () => {
            window.removeEventListener("resize", windowWidthHandler)
        }
    }, []);

    if (windowWidth >= 900){
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