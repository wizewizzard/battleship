import Ship from "../ship";
import config from "../../keys";
import {FieldCellHit, FieldCellShip} from "../_enums";
import {GameBoardBuilder} from "../_interfaces";
import {GameBoard} from "./board";
import {Cell} from "./board";
import {Point2D} from "../_types";
import { BoardValidationError as InvalidBoardException } from "../battleship.exception";

class FieldBuilderValidator {
    private readonly board: Cell[][];
    private readonly ships: Ship[];

    private readonly hasShip = (coords: Point2D): boolean => {
        if (coords.y - 1 < 0 || coords.x < 0 ||
            coords.y >= config.boardSize || coords.x >= config.boardSize ) {
            return false;
        }
        return this.board[coords.y][coords.x].ship === FieldCellShip.ship;
    }

    constructor(board: Cell[][], ships: Ship[]) {
        this.board = board;
        this.ships =  ships;
    }

    validatePlacement(ship: Ship): boolean {
        return !ship.coordinates
            .some(p => {
                if (p.x < 0 || p.x >= config.boardSize) return true;
                if (p.y < 0 || p.y >= config.boardSize) return true;

                return this.hasShip({x: p.x - 1, y: p.y - 1}) ||
                this.hasShip({x: p.x - 1, y: p.y}) ||
                this.hasShip({x: p.x - 1, y: p.y + 1}) ||
                this.hasShip({x: p.x, y: p.y - 1}) ||
                this.hasShip({x: p.x, y: p.y}) ||
                this.hasShip({x: p.x, y: p.y + 1}) ||
                this.hasShip({x: p.x + 1, y: p.y - 1}) ||
                this.hasShip({x: p.x + 1, y: p.y}) ||
                this.hasShip({x: p.x + 1, y: p.y + 1});
            });
    }

    validateBuild(): void {
        if (this.ships.filter(s => s.size === 4).length !== 1) throw new InvalidBoardException('There must be one ship of size 4');
        if (this.ships.filter(s => s.size === 3).length !== 2) throw new InvalidBoardException('There must be two ships of size 3');
        if (this.ships.filter(s => s.size === 2).length !== 3) throw new InvalidBoardException('There must be three ships of size 2');
        if (this.ships.filter(s => s.size === 1).length !== 4) throw new InvalidBoardException('There must be four ships of size 1');
        if (this.ships.length !== 10) throw new InvalidBoardException('There must be ten ships on a board');
    }
}

export class GameBoardBuilderImpl implements GameBoardBuilder {
    private readonly builderValidator: FieldBuilderValidator;
    private readonly board: Cell[][];
    private readonly ships: Ship[];

    constructor() {
        this.board = [];
        this.ships = [];
        this.builderValidator = new FieldBuilderValidator(this.board, this.ships);
        for (let i = 0; i < config.boardSize; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < config.boardSize; j++) {
                row.push({
                    ship: FieldCellShip.empty,
                    hit: FieldCellHit.empty
                });
            }
            this.board.push(row);
        }
    }

    build(): GameBoard {
        this.builderValidator.validateBuild()
        return new GameBoard(this.board, this.ships);
    }

    getIntermediateBoard(): GameBoard {
        return new GameBoard(this.board, this.ships);
    }

    placeShip(ship: Ship): void {
        if (!this.builderValidator.validatePlacement(ship)) {
            throw new InvalidBoardException('Ship cannot be placed here');
        }
        ship.coordinates.forEach(p => this.board[p.y][p.x].ship = FieldCellShip.ship);
        this.ships.push(ship);
    }

}