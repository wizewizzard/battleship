import {GameEvent} from "./_interfaces";
import {UserEventType} from "./_enums";
import {ReadyEventPayload, ShipPlacementPayload, ShotPayload} from "./_types";
import Player from "./player";

export class ReadyEvent implements GameEvent {
    readonly type: UserEventType;
    readonly payload: ReadyEventPayload;
}

export class ShotEvent implements GameEvent {
    readonly type: UserEventType;
    readonly payload: ShotPayload;

    constructor(player: Player, x: number, y: number) {
        this.type = UserEventType.shot;
        this.payload = {player, x, y};
    }
}

export class ShipPlacementEvent implements GameEvent {
    payload: ShipPlacementPayload;
    type: UserEventType;

    constructor(player: Player, coordinates: number[]) {
        this.type = UserEventType.shot;
        this.payload = {player, coordinates};
    }
}