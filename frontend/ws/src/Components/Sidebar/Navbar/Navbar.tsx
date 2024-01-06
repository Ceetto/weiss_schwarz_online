import React from "react";
import {Button} from "@mui/material";
import {DecksIcon, HomeIcon, PlayIcon, ProfileIcon} from "./Icons";

import styles from "../Sidebar.module.css"
import {useNavigate} from "react-router-dom";

function Navbar(){

    const navigate = useNavigate();

    return (
        <div id={styles["navbar_items"]}>
                <Button
                    className={styles["navbar_item"]}
                    variant="outlined"
                    endIcon={<HomeIcon />}
                    onClick={() => {
                        navigate("/")
                    }}
                >
                    <div className={styles["navbar_item_inside"]}>
                        Home
                    </div>

                </Button>


            <Button
                className={styles["navbar_item"]}
                variant="outlined"
                endIcon={<PlayIcon />}
                onClick={() => {
                    navigate("/play/")
                }}
            >
                <div className={styles["navbar_item_inside"]}>
                    Play
                </div>
            </Button>

            <Button
                className={styles["navbar_item"]}
                variant="outlined"
                endIcon={<DecksIcon />}
                onClick={() => {
                    navigate("/decks/")
                }}
            >
                <div className={styles["navbar_item_inside"]}>
                    Decks
                </div>
            </Button>

            <Button
                className={styles["navbar_item"]}
                variant="outlined"
                endIcon={<ProfileIcon />}
                onClick={() => {
                    navigate("/profile/")
                }}
            >
                <div className={styles["navbar_item_inside"]}>
                    Profile
                </div>
            </Button>
        </div>
    )
}


export default Navbar