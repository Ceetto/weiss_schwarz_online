import React, {useEffect, useState} from "react";
import styles from "../Content.module.css"
import {Button, CircularProgress, TextField} from "@mui/material";
import DeckEntry from "./DeckEntry";
import {useNavigate} from "react-router-dom";
import {DeckStats} from "../../../api/types";
import {getMyDeckStats} from "../../../api/apiModule"

function Decks() {

    const navigate = useNavigate();

    const [decks, setDecks] = useState<DeckStats[]|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const decks = await getMyDeckStats();
                setDecks(decks);
            } catch (err:any){
                navigate("/login")
            }
        }
        fetchData();
    }, [navigate]);

    const DeckList = () => {
        if(decks){
            return(
                <>
                    {decks.map((deck) => (
                        <DeckEntry name={deck.deck_name}
                                   characters={deck.character} events={deck.events} climax={deck.climax}
                                   souls={deck.souls} level_0={deck.level_0}
                                   level_1={deck.level_1} level_2={deck.level_2} level_3={deck.level_3}
                                   yellow={deck.yellow} green={deck.green} red={deck.red} blue={deck.blue}
                        />
                    ))}
                </>
            )
        } else {
            return (
                <CircularProgress></CircularProgress>
            )
        }
    }

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
                {DeckList()}
            </div>
        </div>
    )
}

export default Decks