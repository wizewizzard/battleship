import Player from "./player";
import Ship from "./ship";

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
    coordinates: Point2D[];
}

export type ShipHitPayload = {
    player: Player;
    coordinates: Point2D[];
    ship: Ship;
}
