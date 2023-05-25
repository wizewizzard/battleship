import {GameBoardBuilder, GameEvent, Stage} from "./_interfaces";
import {EventType} from "./_enums";
import Player from "./player";
import {GameBoardBuilderImpl} from "./board/gameBoard";

class GameState {
    player1: Player;
    player2: Player;
}

export default class StageManager {
    private currentStage: Stage;
    constructor(gameState: GameState) {

    }

    dispatch(event: GameEvent) {
        this.currentStage.handleEvent(event);
    }

    moveToNextStage(): void {
        const nextStage = this.currentStage.getNextStage();
        if (nextStage) {
            this.currentStage = nextStage;
        }
    }
}

class PrepareStage implements Stage {
    private player1Ready: boolean;
    private player2Ready: boolean;
    onComplete: () => any;
    private readonly gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
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

    getNextStage(): Stage {
        if (this.player1Ready && this.player2Ready) {
            return new ShipPlacementStage(this.gameState)
        }
    }
}

class ShipPlacementStage implements Stage {
    private readonly gameState: GameState;
    private gameBoardBuilder: GameBoardBuilder;
    onComplete: () => any;

    constructor(gameState: GameState) {
        this.gameState = gameState;
        this.gameBoardBuilder = new GameBoardBuilderImpl();
    }

    handleEvent(event: GameEvent): void {
        if (event.type === EventType.shipPlacement) {
            const ship = event.payload.ship;
            this.gameBoardBuilder.placeShip(ship);
        }
    }

    getNextStage(): Stage {
        return new PlayStage(this.gameState);
    }

}

class PlayStage implements Stage {
    private readonly gameState: GameState;
    onComplete: () => any;

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    handleEvent(event: GameEvent): void {
    }

    getNextStage(): Stage {
        return undefined;
    }
}

class GameOverStage implements Stage {
    onComplete: () => any;

    handleEvent(event: GameEvent): void {
    }

    getNextStage(): Stage {
        return null;
        // return new PrepareStage(this.game);
    }
}