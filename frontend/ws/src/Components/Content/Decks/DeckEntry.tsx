import React from "react";
import styles from "./Decks.module.css"
import styles2 from "../Content.module.css"
import {Icon, IconButton} from "@mui/material";
import {EditIcon, EditIcon2, ForkIcon, DeleteIcon} from "../../Icons/Icons"
import {deleteDeck} from "../../../api/apiModule"

interface DeckProps{
    deck_id: number,
    name: string,
    characters: number,
    events: number,
    climax: number,
    souls: number,
    level_0: number,
    level_1: number,
    level_2: number,
    level_3: number,
    yellow: number,
    green: number,
    red: number,
    blue: number,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refresh: boolean,
}

function DeckEntry(props: DeckProps) {

    const delDeck = async function(id: number){
        try{
            await deleteDeck(id);
            props.setRefresh(!props.refresh)
        } catch(err: any) {
            console.log(err.toString())
        }
    }


    return (
        <div id={styles["outer_box"]}>
            <div id={styles["left_inner_box"]}>
                <div className={styles2["normal_text"]} id={styles["deck_name"]}>
                    <h4 className={styles2["no_margin_text"]}>{props.name} </h4>
                </div>
                <div id={styles["stats"]}>
                    <div id={styles["other_stats"]}>
                        <div className={styles["stats_row"]}>
                            <p className={styles["stats_text"]}>Characters: {props.characters}</p>
                            <p className={styles["stats_text"]}>Events: {props.events}</p>
                            <p className={styles["stats_text"]}>Climax: {props.climax}</p>
                            <img className={styles['stats_icon']} src={'/assets/icons/soul.png'} alt={'soul'}/>
                            <p className={styles["stats_text"]}> : {props.souls}</p>
                        </div>
                        <div className={styles["stats_row"]}>
                            <p className={styles["stats_text"]}>Level 0: {props.level_0}</p>
                            <p className={styles["stats_text"]}>Level 1: {props.level_1}</p>
                            <p className={styles["stats_text"]}>Level 2: {props.level_2}</p>
                            <p className={styles["stats_text"]}>Level 3: {props.level_3}</p>
                        </div>
                    </div>
                    <div id={styles["color_stats"]}>
                        <div className={styles["stats_row"]}>
                            <div className={styles["stats_icon"]} id={styles["yellow"]}/>
                            <p className={styles["stats_text"]}> : {props.yellow}</p>
                            <div className={styles["stats_icon"]} id={styles["green"]}/>
                            <p className={styles["stats_text"]}> : {props.green}</p>
                        </div>
                        <div className={styles["stats_row"]}>
                            <div className={styles["stats_icon"]} id={styles["red"]}/>
                            <p className={styles["stats_text"]}> : {props.red}</p>
                            <div className={styles["stats_icon"]} id={styles["blue"]}/>
                            <p className={styles["stats_text"]}> : {props.blue}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id={styles["right_inner_box"]}>
                <IconButton style={{"color":"red"}}
                    onClick={() => {
                        delDeck(props.deck_id)
                    }}
                >
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </div>
        </div>
    )
}

export default DeckEntry;