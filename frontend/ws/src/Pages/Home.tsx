import React, {useEffect, useState} from 'react';
import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./styles.module.css"
import Content from "../Components/Content/Content";

import api from "../api/api";

function Home() {

    return (
        <div id={styles['main']}>
            <Sidebar></Sidebar>
            <Content screen={"home"}></Content>
        </div>

    );
}

export default Home;
