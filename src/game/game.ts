import {GameEvent, Stage} from "./_interfaces";
import Player from "./player";
import {GameBoard} from "./board/gameBoard";
import StageManager from "./stage";

class BattleShipGame {

    init(): void {

    }

    start(): void {

    }
}

export class GameState {
    player1: Player;
    gameBoard1: GameBoard;
    player2: Player;
    gameBoard2: GameBoard;
    turn: number;
}