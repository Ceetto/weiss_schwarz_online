import React, {useEffect, useState} from "react";
import styles from "../Content.module.css"
import {
    Button,
    CircularProgress, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import DeckEntry from "./DeckEntry";
import {useNavigate} from "react-router-dom";
import {DeckStats} from "../../../api/types";
import {encoredecks, getMyDeckStats} from "../../../api/apiModule"
import {AxiosError} from "axios";

function Decks() {

    const navigate = useNavigate();

    const [decks, setDecks] = useState<DeckStats[]|null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [deckName, setDeckName] = useState("");
    const [deckUrl, setDeckUrl] = useState("");
    const [error, setError] = useState("");

    const [refresh, setRefresh] = useState(false);

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
    }, [navigate, dialogOpen, refresh]);

    const uploadFromEncoredecks = async function(url: string, name: string){
        setError("");
        try {
            await encoredecks(url, name);
            setDialogOpen(false);
            // window.location.reload();
        } catch (err:any){
            setError(err["response"]["data"]["Fail"]);
        }
    }

    const DeckList = () => {
        if(decks){
            return(
                <>
                    {decks.map((deck) => (
                        <DeckEntry name={deck.deck_name} deck_id={deck.deck_id} setRefresh={setRefresh} refresh={refresh}
                                   characters={deck.characters} events={deck.events} climax={deck.climax}
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

    const EncoredecksDialog = () => {
        return (
            <Dialog
                className={styles["dialog"]}
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false)
                }}
            >
                <DialogTitle>Upload From Encoredecks</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Pick a name and a valid encoredecks link to upload your deck.
                    </DialogContentText>
                    <p style={{"color": "red"}}>{error}</p>
                    <TextField
                        autoFocus
                        required
                        label="name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setDeckName(e.target.value);
                        }}
                    />
                    <TextField
                        autoFocus
                        required
                        label="url"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setDeckUrl(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setDialogOpen(false);
                    }}>Cancel</Button>
                    <Button onClick={() => {
                            console.log("SUBMIT");
                            uploadFromEncoredecks(deckUrl, deckName);
                        }}
                    >Submit</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return(
        <div className={styles["content_outer"]}>
            {EncoredecksDialog()}
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
                        onClick={() => {
                            setDialogOpen(true);
                        }}
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
