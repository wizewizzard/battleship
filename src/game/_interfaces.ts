import {GameBoard} from './board/gameBoard';
import Ship from './ship';
import {UserEventType} from "./_enums";

export interface GameBoardBuilder {
    placeShip(ship: Ship): void | never;
    build(): GameBoard;
}

export interface Stage {
    handleEvent(event: GameEvent): void;
}

export interface GameEvent {
    type: UserEventType;
    payload: any;
}