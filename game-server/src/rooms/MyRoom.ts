import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";
import {cli} from "@colyseus/loadtest";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 10;

  onCreate (options: any) {
    this.setState(new MyRoomState());
    this.setMetadata({spectators: 0});
    this.setMetadata({players: 0});

    this.onMessage("leave", (client, message) => {
      client.leave()
    })
  }

  onJoin (client: Client, options: {username: string }) {
    console.log(client.sessionId, "joined!");
    try {
      if (this.clients.length == 1){
        this.setMetadata({player1_username: options.username, player1_id: client.sessionId});
        this.state.player1 = options.username;
        this.setMetadata({players: this.metadata.players + 1});
      } else if (this.clients.length == 2) {
        this.setMetadata({player2_username: options.username, player2_id: client.sessionId});
        this.state.player2 = options.username;
        this.setMetadata({players: this.metadata.players + 1});
      } else {
        this.setMetadata({spectators: this.metadata.spectators + 1});
      }
    } catch (err) {
      client.leave();
    }
  }

  onLeave (client: Client, consented: boolean) {
    if (client.sessionId == this.metadata.player1_id){
      if (this.metadata.players >= 2){
        console.log("player 1 left")
        this.setMetadata({player1_username: this.metadata.player2_username, player1_id: this.metadata.player2_id})
        this.setMetadata({player2_username: "", player2_id: ""})
        this.state.player1 = this.state.player2;
        this.state.player2 = "";
      } else {
        console.log("player 2 left")
        this.setMetadata({player2_username: "", player2_id: ""})
        this.state.player2 = "";
      }
      this.setMetadata({players: this.metadata.players - 1});
    } else if (client.sessionId == this.metadata.player2_id){
      this.setMetadata({player2_username: "", player2_id: ""})
      this.setMetadata({players: this.metadata.players - 1});
      this.state.player2 = "";
    } else {
      this.setMetadata({spectators: this.metadata.spectators - 1});
    }
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
