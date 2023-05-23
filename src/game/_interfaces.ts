import {Field} from './field/field';
import Ship from './ship';
import {EventType} from "./_enums";

export interface FieldBuilder {
    placeShip(ship: Ship): void | never;
    build(): Field;
}

export interface Stage {
    handleEvent(event: GameEvent): void;
}

export interface GameEvent {
    type: EventType;
    payload: any;
}