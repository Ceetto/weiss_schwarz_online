import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getMe} from "../../../api/apiModule";
import * as Colyseus from "colyseus.js";
import {User} from "../../../api/types";
import {MyRoomState} from "./ColyseusSchemas/MyRoomState";
import styles from "../Content.module.css";
import {Button, CircularProgress} from "@mui/material";

function Game() {

    const {state} = useLocation()

    const navigate = useNavigate();
    let client = new Colyseus.Client("ws://localhost:2567");
    const [user, setUser] = useState<User|null>(null)

    const [opponentName, setOpponentName] = useState("")
    const [room, setRoom] = useState<Colyseus.Room<MyRoomState>>()


    useEffect(() => {
        const fetchUserData = async () => {
            console.log("fetching user")
            try{
                getMe().then((me) => {
                    setUser(me);
                    console.log(me)
                });
            } catch (err:any){
                navigate("/login")
            }
        }
        try {
            fetchUserData().then()
        } catch (err){
            navigate("/")
        }

    }, [])

    useEffect(() => {
        const createRoom = async () => {
            try {
                if (user){
                    const room: Colyseus.Room<MyRoomState> = await client.create("my_room", {"username": user.username});
                    console.log("succesfully created room ", room)
                    room.state.listen("player2", (nv, pv) => {
                        setOpponentName(nv);
                    })
                    return(room)
                }
            } catch (e) {
                console.log("join error ", e);
            }
        }

        const joinRoom = async () => {
            try {
                if (user) {
                    const room: Colyseus.Room<MyRoomState> = await client.joinById(state.roomId, {"username": user.username});
                    console.log("succesfully joined room ", room)
                    room.state.listen("player1", (nv, pv) => {
                        setOpponentName(nv);
                    })
                    return (room)
                }
            } catch (e) {
                console.log("join error ", e);
            }
        }

        if (state.createRoom){
            createRoom().then((r) => {
                if (r){
                    setRoom(r);
                }
            })
        } else {
            joinRoom().then((r) => {
                if (r){
                    setRoom(r);
                }
            })
        }

    }, [user]);

    const leaveRoom =  () => {
        navigate('/play/')
    }

    if (user) {
        return (
            <div>
                <p className={styles["normal_text"]}>{user.username} vs {opponentName}</p>
                <Button className={styles["normal_button"]}
                        onClick={()=> {
                            leaveRoom();
                        }}
                >
                    leave game
                </Button>
            </div>
        )
    } else {
        return (
            <CircularProgress></CircularProgress>
        )
    }

}

export default Game;
