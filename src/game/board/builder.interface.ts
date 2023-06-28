import {GameBoard} from "./board.entity";
import {Ship} from "./ship.entity";

export interface GameBoardBuilder {
    placeShip(ship: Ship): void | never;
    build(): GameBoard;
}