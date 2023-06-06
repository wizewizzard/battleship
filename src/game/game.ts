import {GameBoard} from "./board/board";
import {GameTurn} from "./_enums";
import Player from "./player";

class BattleShipPlayer extends Player {
    gameBoard: GameBoard;
}

export class GameState {
    player: BattleShipPlayer;
    opponent: BattleShipPlayer;
    turn: GameTurn;
}