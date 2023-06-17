import Ship from "./ship";
import {BattleShipPlayer} from "./game";

export type Point2D = {x:number, y: number};

export type ReadyEventPayload = {
    player: BattleShipPlayer;
}

export type ShotPayload = {
    player: BattleShipPlayer;
    coordinate: Point2D;
}

export type ShipPlacementPayload = {
    player: BattleShipPlayer;
    ship: Ship;
}

export type ShipHitPayload = {
    player: BattleShipPlayer;
    coordinates: Point2D[];
    ship: Ship;
}
