import {GameBoardBuilder, GameEvent, Stage} from "./_interfaces";
import {UserEventType} from "./_enums";
import Player from "./player";
import {GameBoardBuilderImpl} from "./board/builder";
import {Point2D} from "./_types";

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
        /*const nextStage = this.currentStage.getNextStage();
        if (nextStage) {
            this.currentStage = nextStage;
        }*/
    }
}

class ShipPlacementStage implements Stage {
    private readonly gameState: GameState;
    private gameBoardBuilder: GameBoardBuilder;
    private readonly onComplete: () => void;

    constructor(gameState: GameState, onComplete: () => void) {
        this.gameState = gameState;
        this.gameBoardBuilder = new GameBoardBuilderImpl();
        this.onComplete = onComplete;
    }

    handleEvent(event: GameEvent): void {
        if (event.type === UserEventType.shipPlacement) {
            const ship = event.payload.ship;
            this.gameBoardBuilder.placeShip(ship);
        }

        if (false) {
            this.onComplete();
        }
    }
}

class PlayStage implements Stage {
    private readonly gameState: GameState;
    private readonly onComplete: () => void;

    constructor(gameState: GameState, onComplete: () => void) {
        this.gameState = gameState;
        this.onComplete = onComplete;
    }

    handleEvent(event: GameEvent, ): void {
        if (event.type === UserEventType.shot) {
            const coordinates:Point2D = event.payload.coordinates;
        }
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