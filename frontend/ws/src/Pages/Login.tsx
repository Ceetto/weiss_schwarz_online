import React from 'react';
import styles from "./styles.module.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Content from "../Components/Content/Content";



function Login() {
    return (
        <div id={styles['main']}>
            <Content screen={"login"}></Content>
        </div>
    );
}

export default Login;
