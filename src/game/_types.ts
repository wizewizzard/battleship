import Player from "./player";

export type Point2D = {x:number, y: number};

export type ReadyEventPayload = {
    player: Player;
}

export type ShotPayload = {
    player: Player;
    x: number;
    y: number;
}

export type ShipPlacementPayload = {
    player: Player;
    coordinates: number[];
}

export type PayloadType = ShipPlacementPayload | ShotPayload | ReadyEventPayload;