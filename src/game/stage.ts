import {GameEvent, Stage} from "./_interfaces";
import {GameState} from "./game";
import {EventType} from "./_enums";
import Player from "./player";

class GameState {
    player1: Player;
    player2: Player;
}

export default class StageManager {
    private currentStage: Stage;
    constructor(gameState: GameState) {
        const setPlacementStage = () => this.currentStage = new ShipPlacementStage();
        const setPrepareStage = () => this.currentStage = new PrepareStage();

    }

    dispatch(event: GameEvent) {
        this.currentStage.handleEvent(event);
    }
}

class PrepareStage implements Stage {
    private player1Ready: boolean;
    private player2Ready: boolean;
    private readonly onComplete;
    private gameState: GameState;

    constructor(gameState: GameState, onComplete: (_: any) => any) {
        this.gameState = gameState;
        this.onComplete = onComplete;
    }

    handleEvent(event: GameEvent): void {
        if (event.type === EventType.readyButtonToggle) {
            const player = event.payload.player;
            if (event.payload.player === this.gameState.player1) {
                this.player1Ready = !this.player1Ready;
            } else if (event.payload.player === this.gameState.player2) {
                this.player2Ready = !this.player2Ready;
            } else {
                console.warn(`Unknown player ${event.payload.player}`)
            }
            if (this.player1Ready && this.player2Ready) {
                this.onComplete();
            }
        }
    }
}

class ShipPlacementStage implements Stage {
    onComplete;
    handleEvent(event: GameEvent): void {
        if (event.type === EventType.shipPlacement) {
            const player = event.payload.player;

        }
    }

}

class PlayStage {

}

class GameOverStage {

}