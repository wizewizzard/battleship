import {GameBoard} from "./board";
import {BoardShotHandler} from "./shooting";

class BattleShipJudge {
    private readonly playerShotHandler: BoardShotHandler;
    private readonly opponentShotHandler: BoardShotHandler;

    constructor(playerBoard: GameBoard, opponentBoard: GameBoard) {
        this.playerShotHandler = new BoardShotHandler(playerBoard);
        this.opponentShotHandler = new BoardShotHandler(opponentBoard);
    }
}