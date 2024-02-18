import React from "react";
import styles from "../Content.module.css"
import {Button, TextField} from "@mui/material";
import DeckEntry from "./DeckEntry";

function Decks() {
    return(
        <div className={styles["content_outer"]}>
            <div className={styles["content_top"]}>
                <h1 className={styles["normal_text"]}>DECKS</h1>
                <div className={styles["horizontal_box"]}>
                    <Button
                        className={styles["normal_button"]}
                        variant="outlined"
                    >
                        CREATE DECK
                    </Button>
                    <Button
                        className={styles["normal_button"]}
                        variant="outlined"
                    >
                        UPLOAD FROM ENCOREDECKS
                    </Button>
                </div>
                <div className={styles["search_field_box"]}>
                    <TextField
                        className={styles["search_field"]}
                        label="search your decks"
                        type="search"
                        variant="outlined"
                        size="small"
                    >

                    </TextField>
                </div>


            </div>
            <div className={styles["content_inner"]}>
                {Array(10).fill(true).map(() => (
                    <DeckEntry name={"Dummy"}
                               characters={38} events={4} climax={8}
                               souls={14} level_0={18}
                               level_1={10} level_2={2} level_3={12}
                               yellow={15} green={15} red={10} blue={10}
                    />
                ))}

            </div>
        </div>
    )
}

export default Decks