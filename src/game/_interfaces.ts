import {GameBoard} from './board/gameBoard';
import Ship from './ship';
import {EventType} from "./_enums";

export interface FieldBuilder {
    placeShip(ship: Ship): void | never;
    build(): GameBoard;
}

export interface Stage {
    onComplete: () => void;
    getNextStage: () => Stage;
    handleEvent(event: GameEvent): void;
}

export interface GameEvent {
    type: EventType;
    payload: any;
}