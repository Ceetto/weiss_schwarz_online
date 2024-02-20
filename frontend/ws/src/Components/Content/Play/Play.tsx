import {Client} from "colyseus.js";
import {useEffect} from "react";

function Play() {
    let client = new Client("ws://localhost:2567");

    useEffect(() => {
        const connectToRoom = async () => {
            try {
                const room = await client.joinOrCreate("my_room");
                console.log("succesfully joined room ", room)
            } catch (e) {
                console.log("join error ", e);
            }
        }
        connectToRoom()
    }, []);
    return(
        <div>

        </div>
    )
}

export default Play;