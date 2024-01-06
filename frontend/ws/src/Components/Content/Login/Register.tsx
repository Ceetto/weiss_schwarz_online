import React, {useState} from "react";
import {Button, CircularProgress, Link, TextField} from "@mui/material";
import styles from "../Content.module.css"
import {useNavigate} from "react-router-dom";
import {register} from "../../../api/apiModule";


function Register(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [logLoading, setLogLoading] = useState(false);
    const [usernameError, setUsernameError] = useState<string|null>(null);
    const [emailError, setEmailError] = useState<string|null>(null);
    const [passwordError, setPasswordError] = useState<string|null>(null);

    const handleRegister = async (username: string, email: string, password: string, password2: string) => {
        setLogLoading(true);
        register(username, email, password, password2)
            .then(() => navigate("/login/"))
            .catch(err =>{
                setLogLoading(false);
                const errData = err.response.data;
                if (errData["username"]){
                    setUsernameError(errData["username"]);
                } else {
                    setUsernameError(null);
                }
                if (errData["email"]){
                    setEmailError(errData["email"]);
                } else {
                    setEmailError(null);
                }
                if (errData["password"]){
                    setPasswordError(errData["password"]);
                } else {
                    setPasswordError(null);
                }
            })
        setLogLoading(false);
    }

    function RegisterButton(loading: boolean){
        if (loading){
            return (
                <Button className={styles['login_button']}
                        sx={{color: "white", background:'black'}}
                        variant="contained"
                        disabled={true}
                        onClick={() => handleRegister(username, email, password, password2)}
                >
                    <CircularProgress />
                </Button>
            )

        } else {
            return (
                <Button className={styles['login_button']}
                        sx={{color: "white", background:'black'}}
                        variant="contained"
                        disabled={false}
                        onClick={() => handleRegister(username, email, password, password2)}
                >
                    CREATE ACCOUNT
                </Button>
            )
        }
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
                            label="Username"
                            variant="outlined"
                            error={usernameError !== null}
                            helperText={usernameError}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div id={styles['login_field']}>
                        <TextField
                            className={styles['login_textfield']}
                            label="Email"
                            variant="outlined"
                            error={emailError !== null}
                            helperText={emailError}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div id={styles['login_field']}>
                        <TextField
                            className={styles['login_textfield']}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            error={passwordError !== null}
                            helperText={passwordError}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div id={styles['login_field']}>
                        <TextField
                            className={styles['login_textfield']}
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            error={passwordError !== null}
                            helperText={passwordError}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>
                    <Link underline="none" href="#" onClick={() => {navigate("/login")}}>Already have an account</Link>
                </div>

                {RegisterButton(logLoading)}
            </div>

        </div>

    )
}

export default Register;