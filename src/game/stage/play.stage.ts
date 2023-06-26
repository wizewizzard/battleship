import { EventType, GameTurn } from "../_enums";
import { BoardShotHandler } from "../board/shooting";
import { ShotEvent } from "../event";
import { GameState } from "../game";
import { GameOverStage } from "./game-over.stage";
import { Stage } from "./stage.interface";

/**
 * Activates after the placement stage.
 * Completes when any of players destroys opponent's fleet
 */
export class PlayStage implements Stage {
    private readonly playerBoardShotHandler: BoardShotHandler;
    private readonly opponentBoardShotHandler: BoardShotHandler;

    constructor(private readonly gameState: GameState) {
        this.gameState.turn = GameTurn.player;
        this.playerBoardShotHandler = new BoardShotHandler(gameState.player.gameBoard);
        this.opponentBoardShotHandler = new BoardShotHandler(gameState.opponent.gameBoard);
    }

    handleEvent(event: ShotEvent): void {
        if (event.type === EventType.shot) {
            const shotEvent = event as ShotEvent;
            if ( this.gameState.turn === GameTurn.player && shotEvent.payload.player === this.gameState.player) {
                this.opponentBoardShotHandler.handleShot({
                    x: shotEvent.payload.coordinate.x,
                    y: shotEvent.payload.coordinate.y
                });
                this.gameState.turn = GameTurn.opponent;
            } else if (this.gameState.turn === GameTurn.opponent && shotEvent.payload.player === this.gameState.opponent) {
                this.playerBoardShotHandler.handleShot({
                    x: shotEvent.payload.coordinate.x,
                    y: shotEvent.payload.coordinate.y
                });
                this.gameState.turn = GameTurn.player;
            } else {
                throw 'You can not perform this action';
            }
        }
    }

    isCompleted(): boolean {
        return false;
    }

    getNextStage(): Stage {
        return new GameOverStage();
    }

    toString() {
        return "Battle Stage"
    }
}