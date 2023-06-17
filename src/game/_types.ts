import Ship from "./ship";
import {BattleShipPlayer} from "./game";

export type Point2D = {x:number, y: number};

export type ReadyEventPayload = {
    player: BattleShipPlayer;
}

export type ShotPayload = {
    player: BattleShipPlayer;
    x: number;
    y: number;
}

export type ShipPlacementPayload = {
    player: BattleShipPlayer;
    coordinates: Point2D[];
}

export type ShipHitPayload = {
    player: BattleShipPlayer;
    coordinates: Point2D[];
    ship: Ship;
}
