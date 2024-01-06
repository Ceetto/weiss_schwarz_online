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

export type ability = {
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
