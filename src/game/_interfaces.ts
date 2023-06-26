import {GameBoard} from './board/board';
import Ship from './ship';
import {EventType} from "./_enums";

export interface GameBoardBuilder {
    placeShip(ship: Ship): void | never;
    build(): GameBoard;
}

export interface GameEvent {
    type: EventType;
}