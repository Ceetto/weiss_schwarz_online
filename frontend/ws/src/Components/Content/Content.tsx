import React from "react";
import styles from "./Content.module.css"
import Login from "./Login/Login";
import Register from "./Login/Register";
import Home from "./Home/Home";

interface ContentProps{
    screen: string,
}

function Content(props: ContentProps){
    switch(props.screen){
        case "login": {
            return (
                <div id={styles['main']}>
                    <Login></Login>
                </div>
            )
        }
        case "register": {
            return (
                <div id={styles['main']}>
                    <Register></Register>
                </div>
            )
        }
        case "home": {
            return (
                <div id={styles['main']}>
                    <Home></Home>
                </div>
            )
        }
        default: {
            return (
                <div id={styles['main']}>

                </div>
            )
        }
    }

}

export default Content;