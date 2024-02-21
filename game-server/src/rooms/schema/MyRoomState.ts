import { Schema, Context, type, ArraySchema } from "@colyseus/schema";

class PlayerInfo extends Schema{
  @type(["string"]) hand = new ArraySchema<string>();
  @type(["string"]) topCheck = new ArraySchema<string>();
}

class Field extends Schema{
  @type(["string"]) centerStage1 = new ArraySchema<string>();
  @type(["string"]) centerStage2 = new ArraySchema<string>();
  @type(["string"]) backStage1 = new ArraySchema<string>();
  @type(["string"]) backStage2 = new ArraySchema<string>();
  @type(["string"]) clock1 = new ArraySchema<string>();
  @type(["string"]) clock2 = new ArraySchema<string>();
  @type(["string"]) level1 = new ArraySchema<string>();
  @type(["string"]) level2 = new ArraySchema<string>();
  @type(["string"]) resolution1 = new ArraySchema<string>();
  @type(["string"]) resolution2 = new ArraySchema<string>();
  @type(["string"]) waitingRoom1 = new ArraySchema<string>();
  @type(["string"]) waitingRoom2 = new ArraySchema<string>();
  @type(["string"]) memory1 = new ArraySchema<string>();
  @type(["string"]) memory2 = new ArraySchema<string>();
  @type("number") stock1: number;
  @type("number") stock2: number;
  @type("number") deck1: number;
  @type("number") deck2: number;
}

export class GameState extends Schema {

}

export class MyRoomState extends Schema {

  @type("string") player1: string = "";
  @type("string") player2: string = "";


}
