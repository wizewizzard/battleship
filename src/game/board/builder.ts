import Ship from "../ship";
import config from "../../keys";
import {FieldCellHit, FieldCellShip} from "../_enums";
import {GameBoardBuilder} from "../_interfaces";
import {GameBoard} from "./gameBoard";
import {Cell} from "./gameBoard";
import BoardValidationError from "../exception/BoardValidationError";

class FieldBuilderValidator {
    private readonly fieldArray: Cell[][];
    private readonly ships: Ship[];

    constructor(fieldArray: Cell[][], ships: Ship[]) {
        this.fieldArray = fieldArray;
        this.ships =  ships;
    }

    validatePlacement(ship: Ship): boolean {
        return !ship.coordinates
            .some(p => {
                if (p.x < 0 || p.x >= config.boardSize) return true;
                if (p.y < 0 || p.y >= config.boardSize) return true;
                if (this.fieldArray[p.y][p.x].ship === FieldCellShip.ship) return true;
            });
    }

    validateBuild(): void {
        if (this.ships.filter(s => s.size === 4).length !== 1) throw new BoardValidationError('There must be one ship of size 4');
        if (this.ships.filter(s => s.size === 3).length !== 2) throw new BoardValidationError('There must be two ships of size 3');
        if (this.ships.filter(s => s.size === 2).length !== 3) throw new BoardValidationError('There must be three ships of size 2');
        if (this.ships.filter(s => s.size === 1).length !== 4) throw new BoardValidationError('There must be four ships of size 1');
        if (this.ships.length !== 10) throw new BoardValidationError('There must be ten ships on a board');
    }
}

export class GameBoardBuilderImpl implements GameBoardBuilder {
    private readonly builderValidator: FieldBuilderValidator;
    private readonly fieldArray: Cell[][];
    private readonly ships: Ship[];

    constructor() {
        this.fieldArray = [];
        this.ships = [];
        this.builderValidator = new FieldBuilderValidator(this.fieldArray, this.ships);
        for (let i = 0; i < config.boardSize; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < config.boardSize; j++) {
                row.push({
                    ship: FieldCellShip.empty,
                    hit: FieldCellHit.empty
                });
            }
            this.fieldArray.push(row);
        }
    }

    build(): GameBoard {
        this.builderValidator.validateBuild()
        return new GameBoard(this.fieldArray, this.ships);
    }

    placeShip(ship: Ship): void {
        if (!this.builderValidator.validatePlacement(ship)) {
            throw new BoardValidationError('Ship cannot be placed here');
        }
        ship.coordinates.forEach(p => this.fieldArray[p.y][p.x].ship = FieldCellShip.ship);
    }

}