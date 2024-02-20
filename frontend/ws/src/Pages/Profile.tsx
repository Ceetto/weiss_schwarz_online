import styles from "./styles.module.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Content from "../Components/Content/Content";
import React from "react";

function Profile(){
    return(
        <div id={styles['main']}>
            <Sidebar></Sidebar>
            <Content screen={"profile"}></Content>
        </div>
    )
}

export default Profile;