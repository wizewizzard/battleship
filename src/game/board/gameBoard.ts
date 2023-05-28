import {GameBoardBuilder} from '../_interfaces';
import Ship from "../ship";
import {FieldCellHit, FieldCellShip} from "../_enums";

export type Cell = {
    ship: FieldCellShip;
    hit: FieldCellHit;
}

export class GameBoard {
    readonly ships: Ship[];
    readonly board: Cell[][];

    constructor(board: Cell[][], ships: Ship[]) {
        this.board = board;
        this.ships = ships;
    }
}
