import {Point2D} from "../_interfaces";
import {GameBoard} from "./board.entity";
import {FieldCellHit, FieldCellShip} from "../_enums";
import {ShipState} from "./ship-state.enum";
import {Ship} from "./ship.entity";

export class BoardShotHandler {
    private readonly gameBoard: GameBoard;

    constructor(gameBoard: GameBoard) {
        this.gameBoard = gameBoard;
    }

    handleShot(point: Point2D,
               onShipHit?: (ship: Ship) => void,
               onMiss?: () => void,
               onShipDestruction?: (ship: Ship) => void,
               onFleetDestruction?: () => void) {
        this.gameBoard.board[point.y][point.x].hit = FieldCellHit.hit;
        if (this.gameBoard.board[point.y][point.x].ship === FieldCellShip.ship) {
            const hitShip = this.gameBoard.ships.find(s => s.contains(point));
            if (hitShip.state === ShipState.intact) {
                hitShip.state = ShipState.hit;
            }
            if (onShipHit) onShipHit(hitShip);
            const shipHitCells = hitShip.coordinates.filter(c => this.gameBoard.board[c.y][c.x].hit === FieldCellHit.hit);
            if (shipHitCells.length === hitShip.size) {
                hitShip.state = ShipState.sunk;
                if (onShipDestruction) onShipDestruction(hitShip);
            }
            if (this.gameBoard.ships.filter(s => s.state !== ShipState.sunk).length === 0) {
                if (onFleetDestruction) onFleetDestruction();
            }
        } else {
            if (onMiss) onMiss();
        }
    }
}