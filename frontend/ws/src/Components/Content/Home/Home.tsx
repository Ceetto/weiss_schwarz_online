import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getMe, logout} from "../../../api/apiModule"
import {User} from "../../../api/types"

import styles from "../Content.module.css";
import {Button, CircularProgress} from "@mui/material";

function Home (){
    const navigate = useNavigate();

    const [user, setUser] = useState<User|null>(null)

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
    }, [])

    const handleLogout = () => {
        logout();
        navigate("/login")
    }
    if (user){
        return (
            <div>
                <h2 className={styles["normal_text"]}>Welcome, {user?.username}</h2>
                <Button
                    variant="contained"
                    onClick={() => {handleLogout()}}
                >
                    Log Out
                </Button>
            </div>
        )
    } else {
        return (
            <CircularProgress />
        )
    }

}

export default Home