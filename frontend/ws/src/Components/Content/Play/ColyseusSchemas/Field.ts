// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.26
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';


export class Field extends Schema {
    @type([ "string" ]) public centerStage1: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public centerStage2: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public backStage1: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public backStage2: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public clock1: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public clock2: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public level1: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public level2: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public resolution1: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public resolution2: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public waitingRoom1: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public waitingRoom2: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public memory1: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public memory2: ArraySchema<string> = new ArraySchema<string>();
    @type("number") public stock1!: number;
    @type("number") public stock2!: number;
    @type("number") public deck1!: number;
    @type("number") public deck2!: number;
}
