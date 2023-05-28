import {GameBoardBuilder} from '../_interfaces';
import Ship from "../ship";
import {FieldCellHit, FieldCellShip} from "../_enums";
import config from '../../keys';
import ShipPlacementError from "../exception/ShipPlacementError";

export type Cell = {
    x: number;
    y: number;
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
