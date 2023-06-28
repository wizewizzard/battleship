import {Ship} from "../board/ship.entity";
import { BattleShipPlayer } from "../game";

export interface Point2D { x: number, y: number };

export interface EventPayload {
}

export interface ReadyEventPayload extends EventPayload {
    player: BattleShipPlayer;
}

export interface ShotPayload extends EventPayload {
    player: BattleShipPlayer;
    coordinate: Point2D;
}

export interface ShipPlacementPayload extends EventPayload {
    player: BattleShipPlayer;
    ship: Ship;
}

export interface ShipHitPayload extends EventPayload {
    player: BattleShipPlayer;
    coordinates: Point2D[];
    ship: Ship;
}
