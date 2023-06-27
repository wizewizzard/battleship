import {GameEvent} from "./_interfaces";
import {EventType} from "./_enums";
import {Point2D, ReadyEventPayload, ShipPlacementPayload, ShotPayload} from "./event-payload.interface";

export interface ReadyEvent extends GameEvent {
    readonly payload: ReadyEventPayload;
}

export interface ShotEvent extends GameEvent {
    readonly payload: ShotPayload;
}

export interface ShipPlacementEvent extends GameEvent {
    payload: ShipPlacementPayload;
}

// export interface ShipHitEvent extends GameEvent<> {
// }