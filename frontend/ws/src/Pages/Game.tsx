import styles from "./styles.module.css";
import Content from "../Components/Content/Content";
import React from "react";

function Game(){
    return(
        <div id={styles['main']}>
            <Content screen={"game"}></Content>
        </div>
    )
}

export default Game;
