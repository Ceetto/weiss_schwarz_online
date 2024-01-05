import {useEffect, useState} from "react";
import api from "../../../api/api";
import {useNavigate} from "react-router-dom";

function Home (){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try{
                const result = await api.get("/users/me/")
                setUsername(result.data["username"])
            } catch (err:any){
                navigate("/login")
            }
        }
        fetchData();

    }, [])

    return (
        <div>
            <h2>Welcome, {username}</h2>
        </div>
    )
}

export default Home