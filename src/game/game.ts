import {GameBoard} from "./board/board";
import {GameTurn} from "./_enums";
import Player from "./player";

export class BattleShipPlayer extends Player {
    gameBoard: GameBoard;
    ready: boolean;

    constructor(nickname: string) {
        super(nickname);
    }

    constructor(nickname: string, gameBoard: GameBoard) {
        super(nickname);
        this.gameBoard = gameBoard;
    }
}

export class GameState {
    player: BattleShipPlayer;
    opponent: BattleShipPlayer;
    turn: GameTurn;
    winner: BattleShipPlayer;

    constructor(player: BattleShipPlayer, opponent: BattleShipPlayer) {
        this.player = player;
        this.opponent = opponent;
    }
}