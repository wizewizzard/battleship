import {GameBoard} from './board/board';
import Ship from './ship';
import {UserEventType} from "./_enums";

export interface GameBoardBuilder {
    placeShip(ship: Ship): void | never;
    build(): GameBoard;
}

export interface Stage {
    handleEvent(event: GameEvent): void;
    isCompleted: () => boolean;
    getNextStage(): Stage;
}

export interface GameEvent {
    type: UserEventType;
}