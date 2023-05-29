import {Point2D} from "../_types";
import {GameBoard} from "./gameBoard";
import {FieldCellHit, FieldCellShip, ShipState} from "../_enums";

export default class BoardShotHandler {
    private readonly gameBoard: GameBoard;
    private readonly onShipHit: () => void;
    private readonly onShipDestruction: () => void;
    private readonly onFleetDestruction: () => void;

    constructor(gameBoard: GameBoard,
                onShipHit: () => void,
                onShipDestruction: () => void,
                onFleetDestruction: () => void ) {
        this.gameBoard = gameBoard;
        this.onShipHit = onShipHit;
        this.onShipDestruction = onShipDestruction;
        this.onFleetDestruction = onFleetDestruction;
    }

    handleShot(point: Point2D) {
        this.gameBoard.board[point.y][point.x].hit = FieldCellHit.hit;

        if (this.gameBoard.board[point.y][point.x].ship === FieldCellShip.ship) {
            const hitShip = this.gameBoard.ships.find(s => s.contains(point));
            if (hitShip.state === ShipState.intact) {
                hitShip.state = ShipState.hit;
            }
            if(this.onShipHit) this.onShipHit();
            const shipHitCells = hitShip.coordinates.filter(c => this.gameBoard.board[point.y][point.x].hit === FieldCellHit.hit);
            if (shipHitCells.length === hitShip.size) {
                hitShip.state = ShipState.sunk;
                if (this.onShipDestruction) this.onShipDestruction();
            }
            if (this.gameBoard.ships.filter(s => s.state !== ShipState.sunk).length === 0) {
                this.onFleetDestruction();
            }
        }
    }
}