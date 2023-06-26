import {GameEvent} from "./_interfaces";
import {EventType} from "./_enums";
import {Point2D, ReadyEventPayload, ShipPlacementPayload, ShotPayload} from "./_types";
import {BattleShipPlayer} from "./game";
import Ship from "./ship";

export class ReadyEvent implements GameEvent {
    readonly type: EventType;
    readonly payload: ReadyEventPayload;

    constructor(player: BattleShipPlayer) {
        this.type = EventType.readyToggle;
        this.payload = {player};
    }
}

export class ShotEvent implements GameEvent {
    readonly type: EventType;
    readonly payload: ShotPayload;

    constructor(playerWhoShoots: BattleShipPlayer, coordinate: Point2D) {
        this.type = EventType.shot;
        this.payload = {player: playerWhoShoots, coordinate};
    }
}

export class ShipPlacementEvent implements GameEvent {
    payload: ShipPlacementPayload;
    type: EventType;

    constructor(player: BattleShipPlayer, ship: Ship) {
        this.type = EventType.shipPlacement;
        this.payload = {player, ship};
    }
}

export class ShipHitEvent implements GameEvent{
    type: EventType;
}