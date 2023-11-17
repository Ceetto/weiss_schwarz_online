import React from 'react';
import styles from "./styles.module.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Content from "../Components/Content/Content";
// import './App.css';

function Login() {
    return (
        <div id={styles['main']}>
            <Sidebar></Sidebar>
            <Content></Content>
        </div>
    );
}

export default Login;
