import Ship from "../ship";
import config from "../../keys";
import {FieldCellHit, FieldCellShip} from "../_enums";
import {GameBoardBuilder} from "../_interfaces";
import ShipPlacementError from "../exception/ShipPlacementError";
import {GameBoard} from "./gameBoard";
import {Cell} from "./gameBoard";

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

    validateBuild(): boolean {
        return this.ships.length === 10;
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
        if (this.builderValidator.validateBuild()) {
            return new GameBoard(this.fieldArray, this.ships);
        }
    }

    placeShip(ship: Ship): void {
        if (!this.builderValidator.validatePlacement(ship)) {
            throw new ShipPlacementError('Ship cannot be placed here');
        }
        ship.coordinates.forEach(p => this.fieldArray[p.y][p.x].ship = FieldCellShip.ship);
    }

}