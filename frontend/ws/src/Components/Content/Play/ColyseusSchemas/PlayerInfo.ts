// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.26
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';


export class PlayerInfo extends Schema {
    @type([ "string" ]) public hand: ArraySchema<string> = new ArraySchema<string>();
    @type([ "string" ]) public topCheck: ArraySchema<string> = new ArraySchema<string>();
}
