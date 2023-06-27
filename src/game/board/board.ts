import {GameBoardBuilder} from '../_interfaces';
import Ship from "../ship";
import {FieldCellHit, FieldCellShip} from "../_enums";
import {Point2D} from "../_interfaces";

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

    getShipAtCoordinate(coords: Point2D): Ship | undefined {
        return this.ships.find(s => s.contains(coords));
    }
}
