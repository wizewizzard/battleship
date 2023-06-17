import {GameBoard} from "./board/board";
import {GameTurn} from "./_enums";

export class BattleShipPlayer {
    nickname:string;
    gameBoard: GameBoard;

    constructor(nickname: string, gameBoard?: GameBoard) {
        this.nickname = nickname;
        this.gameBoard = gameBoard;
    }
}

export class GameState {
    player: BattleShipPlayer;
    opponent: BattleShipPlayer;
    turn: GameTurn;
    winner: BattleShipPlayer;
    currentStage: string;

    constructor(player: BattleShipPlayer, opponent: BattleShipPlayer) {
        this.player = player;
        this.opponent = opponent;
    }
}