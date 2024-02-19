import api from "./api";
import {Deck, DeckStats, User} from "./types"

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

async function getMyDeckStats(): Promise<DeckStats[]>{
    const response = await api.get("/decks/my_decks_stats/")
    const data = response.data;
    let result:DeckStats[] = [];
    for(let i = 0; i < data.length; i++){
        result.push({
            deck_id: data[i]["deck"],
            deck_name: data[i]["deck_name"],
            level_0 : data[i]["level_0"],
            level_1 : data[i]["level_1"],
            level_2 : data[i]["level_2"],
            level_3 : data[i]["level_3"],
            character : data[i]["character"],
            events : data[i]["events"],
            climax: data[i]["climax"],
            souls : data[i]["souls"],
            yellow: data[i]["yellow"],
            green : data[i]["green"],
            red : data[i]["red"],
            blue : data[i]["blue"],
        })
    }
    return result;
}

async function encoredecks(url: string, name: string){
    await api.post("/decks/encoredecks/", {url, name});
}

async function deleteDeck(deck_id: number){
    await api.delete("/decks/"+deck_id+"/");
}


export {
    login,
    register,
    logout,
    getMe,
    getMyDeckStats,
    encoredecks,
    deleteDeck,
}