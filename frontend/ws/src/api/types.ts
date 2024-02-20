export type User = {
    id: number;
    username: string;
    email: string;
    playerSecret: string;
}

export type Card = {
    sid: string;
    name: string;
    code: string;
    rarity: string;
    type: string;
    color: string;
    level: number;
    cost: number;
    power: number;
    soul: number;
    trigger: string;
    image: string;
    set: string;
    neo: string;
    attributes: string[];
    abilities: number[]
}

export type Ability = {
    id: number;
    text: string;
}

export type Deck = {
    id: number;
    name: string;
    active: boolean;
    legal: boolean;
    cards: Card[];
}

export type DeckStats = {
    deck_id: number;
    deck_name: string;
    level_0 : number;
    level_1 : number;
    level_2 : number;
    level_3 : number;
    characters : number;
    events : number;
    climax: number;
    souls : number;
    yellow: number;
    green : number;
    red : number;
    blue : number;
}
