import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getMe, logout} from "../../../api/apiModule"
import {User} from "../../../api/types"

import {Button, CircularProgress} from "@mui/material";
import styles from "../Content.module.css";

function Home (){
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try{
                await getMe();
            } catch (err:any){
                navigate("/login")
            }
        }
        fetchData();
    }, [navigate])
    return (
        <div>
            Home Page
        </div>
    )
}

export default Home