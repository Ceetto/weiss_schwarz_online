import * as Colyseus from "colyseus.js";
import {MyRoomState} from "./ColyseusSchemas/MyRoomState"
import React, {useEffect, useState} from "react";
import styles from "../Content.module.css"
import {Button, CircularProgress, Icon, IconButton, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {User} from "../../../api/types";
import {getMe} from "../../../api/apiModule";

function Play() {
    let client = new Colyseus.Client("ws://localhost:2567");

    const navigate = useNavigate();

    const [user, setUser] = useState<User|null>(null)

    const [rooms, setRooms] = useState<Colyseus.RoomAvailable<any>[]|null>(null);

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const me = await getMe();
                setUser(me);
            } catch (err:any){
                navigate("/login")
            }
        }
        fetchData();
    }, [navigate]);

    useEffect(() => {
        const fetchRooms = async () => {
            client.getAvailableRooms("my_room").then(rooms => {
                setRooms(rooms);
            }).catch(e => {
                console.error(e);
            });
        }
        fetchRooms();
    }, [refresh]);


    const createRoom = async () => {
        if (user){
            try {
                const room: Colyseus.Room<MyRoomState> = await client.create("my_room", {"username": user.username});
                console.log("succesfully created room ", room)
                room.state.players.onChange((v, k) => {
                    console.log(Array.from(room.state.players.values()));
                })
            } catch (e) {
                console.log("join error ", e);
            }
        }
    }

    const RoomsList = () => {
        if(rooms){
            if (rooms.length <= 0){
                return(
                    <p className={styles["normal_text"]}>No available rooms found :(</p>
                )
            } else {
                return(
                    <>
                    </>
                )
            }

        } else {
            return (
                <CircularProgress></CircularProgress>
            )
        }
    }

    if (user){
        return(
            <div className={styles["content_outer"]}>
                <div className={styles["content_top"]}>
                    <h1 className={styles["normal_text"]}>GAME ROOMS</h1>
                    <div className={styles["horizontal_box"]}>
                        <Button
                            className={styles["normal_button"]}
                            variant="outlined"
                            onClick={() => {
                                createRoom();
                            }}
                        >
                            CREATE PUBLIC ROOM
                        </Button>
                        <Button
                            className={styles["normal_button"]}
                            variant="outlined"
                        >
                            CREATE PRIVATE ROOM
                        </Button>
                        <Button
                            className={styles["normal_button"]}
                            variant="outlined"
                        >
                            JOIN PRIVATE ROOM
                        </Button>
                        <Button
                            className={styles["normal_button"]}
                            variant="outlined"
                            onClick={() => {
                                setRefresh(!refresh)
                            }}
                        >
                            REFRESH ROOMS
                        </Button>
                    </div>
                    <div className={styles["search_field_box"]}>
                        <TextField
                            className={styles["search_field"]}
                            label="search game rooms"
                            type="search"
                            variant="outlined"
                            size="small"
                        >

                        </TextField>
                    </div>

                </div>
                <div className={styles["content_inner"]}>
                    {RoomsList()}
                </div>
            </div>
        )
    } else {
        return (
            <CircularProgress></CircularProgress>
        )
    }


}

export default Play;
