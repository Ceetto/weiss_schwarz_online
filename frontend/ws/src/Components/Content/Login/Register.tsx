import React, {useState} from "react";
import {Button, Link, TextField} from "@mui/material";
import axios from "axios";
import api from "../../../api/api"
import styles from "../Content.module.css"
import {useNavigate} from "react-router-dom";


function Register(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleRegister = async (username: string, email: string, password: string, password2: string) => {
        // try {
        //     const response = await axios
        //         .post(`//${process.env.REACT_APP_API_URL}/auth/login/`, { username, password });
        //     const tokens: {refresh: string, access: string} = response.data;
        //     localStorage.setItem('access', tokens.access);
        //     localStorage.setItem('refresh', tokens.refresh);
        // } catch (err: any){
        //     console.log(err.toString())
        // }
    }


    return(
        <div id={styles["login_screen"]}>
            <div id={styles['logo']}>
                <img id={styles['logo_img']} src={'/assets/logo/ws_logo.png'} alt={'logo'}/>
            </div>

            <div id={styles["login_fields_and_buttons"]}>
                <div className={styles["normal_text"]}>
                    <h2>Welcome to Weiss Online</h2>
                </div>

                <div id={styles["login_fields_group"]}>
                    <div id={styles['login_field']}>
                        <TextField
                            className={styles['login_textfield']}
                            error={false}
                            label="Username"
                            variant="outlined"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div id={styles['login_field']}>
                        <TextField
                            className={styles['login_textfield']}
                            error={false}
                            label="Email"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div id={styles['login_field']}>
                        <TextField
                            className={styles['login_textfield']}
                            error={false}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div id={styles['login_field']}>
                        <TextField
                            className={styles['login_textfield']}
                            error={false}
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>
                    <Link underline="none" href="#" onClick={() => {navigate("/login")}}>Already have an account</Link>
                </div>

                <div id={styles['login_buttons']}>
                    <Button className={styles['login_button']}
                            sx={{color: "white", background:'black'}}
                            variant="contained"
                            onClick={() => handleRegister(username, email, password, password2)}
                    >
                        CREATE ACCOUNT
                    </Button>
                </div>
            </div>

        </div>

    )
}

export default Register;