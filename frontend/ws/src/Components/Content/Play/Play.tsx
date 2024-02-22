import * as Colyseus from "colyseus.js";
import {MyRoomState} from "./ColyseusSchemas/MyRoomState"
import React, {useEffect, useState} from "react";
import styles from "../Content.module.css"
import roomListStyles from "./Play.module.css";
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
    }, []);

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
        navigate("/game/", {
            state: {
                createRoom: true,
                roomId: "",
            }
        });
    }

    interface RoomElementProps{
        player1: string,
        player2: string,
        room_id: string,
    }
    const RoomListElement = (props: RoomElementProps) => {
        const joinRoom = () => {
            navigate("/game/", {
                state: {
                    createRoom: false,
                    roomId: props.room_id,
                }
            })
        }

        return(
            <div id={roomListStyles["outer_box"]}>
                <div id={roomListStyles["left_inner_box"]}>
                    <p className={styles["normal_text"]}>{props.player1} vs {props.player2}</p>
                </div>
                <div id={roomListStyles["right_inner_box"]}>
                    <Button className={styles["normal_button"]}
                        onClick={() => {
                            joinRoom();
                        }}
                    >
                        Join Game
                    </Button>
                </div>
            </div>
        )
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
                        {rooms.map((room) => (
                            <RoomListElement player1={room.metadata["player1_username"]}
                                             player2={room.metadata["player2_username"]}
                                             room_id={room.roomId}/>
                        ))}
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
