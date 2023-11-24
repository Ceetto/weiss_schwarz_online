import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import styles from "../Sidebar.module.css";
import authSlice from "../../../api/store/slices/auth";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function LoginFields(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (username: string, password: string) => {
        console.log(`${process.env.REACT_APP_API_URL}auth/login/`)
        axios
            .post(`//${process.env.REACT_APP_API_URL}auth/login/`, { username, password })
            .then((res) => {
                dispatch(
                    authSlice.actions.setAuthTokens({
                        token: res.data.access,
                        refreshToken: res.data.refresh,
                    })
                );
                dispatch(authSlice.actions.setAccount(res.data.user));
                setLoading(false);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.toString())
                // setMessage(err.response.data.detail.toString());
            });
    };

    return(
        <div>
            <div id={styles["sub_title"]}>
                <h2>LOGIN</h2>
            </div>

            <div id={styles["login_fields_group"]}>
                <div id={styles['login_field']}>
                    <TextField
                        className={styles['login_textfield']}
                        // sx={{input: {color: "white"}, label: {color:'white'}, width:"100%"}}
                        error={false}
                        label="Username"
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div id={styles['login_field']}>
                    <TextField
                        className={styles['login_textfield']}
                        // sx={{input: {color: "white"}, label: {color:'white'}, width:"100%"}}
                        error={false}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div id={styles['login_buttons']}>
                <Button className={styles['login_button']}
                        sx={{color: "black", background:'white'}}
                        variant="contained">CREATE ACCOUNT</Button>
                <Button className={styles['login_button']}
                        sx={{color: "white", background:'black'}}
                        variant="contained"
                        onClick={() => handleLogin(username, password)}
                >
                    LOGIN
                </Button>
            </div>
        </div>

    )
}

export default LoginFields;