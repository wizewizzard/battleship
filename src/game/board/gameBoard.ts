import {GameBoardBuilder} from '../_interfaces';
import Ship from "../ship";
import {FieldCellHit, FieldCellShip} from "../_enums";
import config from '../../keys.js';
import ShipPlacementError from "../exception/ShipPlacementError";

type Cell = {
    x: number;
    y: number;
    ship: FieldCellShip;
    hit: FieldCellHit;
}

export class GameBoard {
    readonly board: Cell[][];

    constructor(board: Cell[][]) {
        this.board = board;
    }
}

class ShipPlacementValidator {
    private readonly fieldArray: Cell[][];


    constructor(fieldArray: Cell[][]) {
        this.fieldArray = fieldArray;
    }

    validate(ship: Ship): boolean {
        return !ship.coordinates
            .some(p => {
                if (p.x < 0 || p.x >= config.boardSize) return true;
                if (p.y < 0 || p.y >= config.boardSize) return true;
                if (this.fieldArray[p.y][p.x].ship === FieldCellShip.ship) return true;
            });
    }
}

export class GameBoardBuilderImpl implements GameBoardBuilder {
    private readonly placementValidator: ShipPlacementValidator;
    private readonly fieldArray: Cell[][];

    constructor() {
        this.fieldArray = [];
        this.placementValidator = new ShipPlacementValidator(this.fieldArray);
        for (let i = 0; i < config.boardSize; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < config.boardSize; j++) {
                row.push({
                    x: j,
                    y: i,
                    ship: FieldCellShip.empty,
                    hit: FieldCellHit.empty
                });
            }
            this.fieldArray.push(row);
        }
    }

    build(): GameBoard {
        return new GameBoard(this.fieldArray);
    }

    placeShip(ship: Ship): void {
        if (!this.placementValidator.validate(ship)) {
            throw new ShipPlacementError('Ship cannot be placed here');
        }
        ship.coordinates.forEach(p => this.fieldArray[p.y][p.x].ship = FieldCellShip.ship);
    }

}