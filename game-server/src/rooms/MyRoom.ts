import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 10;

  onCreate (options: any) {
    this.setState(new MyRoomState());
    this.setMetadata({spectators: 0});

    this.onMessage("test", (client, message) => {
      this.state.property = message["property"]
    });
  }


  onJoin (client: Client, options: {username: string }) {
    console.log(client.sessionId, "joined!");
    console.log(this.roomId + " " + this.clients.length)
    if (this.clients.length == 1){
      this.setMetadata({player1_username: options.username, player1_id: client.sessionId});
    } else if (this.clients.length == 2) {
      this.setMetadata({player2_username: options.username, player2_id: client.sessionId})
    } else {
      this.setMetadata({spectators: this.metadata.spectators + 1});
    }
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
