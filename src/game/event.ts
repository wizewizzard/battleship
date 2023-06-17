import {GameEvent} from "./_interfaces";
import {EventType} from "./_enums";
import {Point2D, ReadyEventPayload, ShipPlacementPayload, ShotPayload} from "./_types";
import {BattleShipPlayer} from "./game";

export class ReadyEvent implements GameEvent {
    readonly type: EventType;
    readonly payload: ReadyEventPayload;

    constructor(player: BattleShipPlayer) {
        this.type = EventType.readyButtonToggle;
        this.payload = {player};
    }
}

export class ShotEvent implements GameEvent {
    readonly type: EventType;
    readonly payload: ShotPayload;

    constructor(player: BattleShipPlayer, x: number, y: number) {
        this.type = EventType.shot;
        this.payload = {player, x, y};
    }
}

export class ShipPlacementEvent implements GameEvent {
    payload: ShipPlacementPayload;
    type: EventType;

    constructor(player: BattleShipPlayer, coordinates: Point2D[]) {
        this.type = EventType.shot;
        this.payload = {player, coordinates};
    }
}

export class ShipHitEvent implements GameEvent{
    type: EventType;

}