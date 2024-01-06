import api from "./api";
import {User} from "./types"

async function login(username: string, password: string){
    const response = await api
        .post(`/auth/login/`, { username, password });
    const tokens: {refresh: string, access: string} = response.data;
    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);
}

async function register(username: string, email: string, password: string, password2: string){
    const response = await api
        .post(`/auth/register/`, { username, password, password2, email });
    localStorage.setItem('access', "");
    localStorage.setItem('refresh', "");
}

function logout(){
    localStorage.setItem('access', "");
    localStorage.setItem('refresh', "");
}

async function getMe(): Promise<User>{
    const response = await api.get("/users/me/");
    const data = response.data;
    return {
        id: data["id"],
        username: data["username"],
        email: data["email"],
        playerSecret: "not yet implemented" //TODO
    };
}



export {
    login,
    register,
    logout,
    getMe,
}