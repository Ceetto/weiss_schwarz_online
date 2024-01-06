import React, {useState} from "react";
import {Button, CircularProgress, TextField} from "@mui/material";
import styles from "../Content.module.css"
import {useNavigate} from "react-router-dom";
import {login} from "../../../api/apiModule";


function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [logLoading, setLogLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleLogin = async (username: string, password: string) => {
        setLogLoading(true);
        login(username, password)
            .then(() => navigate("/"))
            .catch(err =>{
                setLogLoading(false);
                setError(true);
            })
        setLogLoading(false);
    }

    const keyPress = (e:React.KeyboardEvent) => {
        if(e.key === "Enter"){
            handleLogin(username, password);
        }
    }

    function LoginButton(loading: boolean){
        if (loading){
            return (
                <Button className={styles['login_button']}
                        sx={{color: "white", background:'black'}}
                        variant="contained"
                        disabled={true}
                        onClick={() => handleLogin(username, password)}
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
                        onClick={() => handleLogin(username, password)}
                >
                    LOGIN
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
                    {/*<div hidden={!error} className={styles["error"]}>*/}
                    {/*    <p>Wrong username or password</p>*/}
                    {/*</div>*/}
                    <div id={styles['login_field']}>
                        <TextField
                            className={styles['login_textfield']}
                            label="Username"
                            variant="outlined"
                            error={error}
                            helperText={error?"Incorrect username or password": ""}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div id={styles['login_field']}>
                        <TextField
                            className={styles['login_textfield']}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            error={error}
                            helperText={error?"Incorrect username or password": ""}
                            onKeyDown={(e) => {keyPress(e)}}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div id={styles['login_buttons']}>
                    <Button className={styles['login_button']}
                            sx={{color: "black", background:'white'}}
                            variant="contained"
                            onClick={() => {navigate("/register")}}
                    >
                        CREATE ACCOUNT
                    </Button>
                    {LoginButton(logLoading)}
                </div>
            </div>

        </div>

    )
}




export default Login