import React from 'react';
import styles from "./styles.module.css";
import Content from "../Components/Content/Content";



function Register() {
    return (
        <div id={styles['main']}>
            <Content screen={"register"}></Content>
        </div>
    );
}

export default Register;
