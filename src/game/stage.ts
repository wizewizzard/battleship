import {GameBoardBuilder, GameEvent, Stage} from "./_interfaces";
import {GameTurn, EventType} from "./_enums";
import {GameBoardBuilderImpl} from "./board/builder";
import {ReadyEvent, ShipPlacementEvent, ShotEvent} from "./event";
import {GameState} from "./game";
import BoardShotHandler from "./board/shooting";
import Ship from "./ship";

export default class GameStageManager {
    private currentStage: Stage;
    private readonly gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
        this.initWithDefaultStage();
    }

    initWithDefaultStage() {
        this.setStage(new PrepareStage(this.gameState));
    }

    dispatch(event: GameEvent) {
        this.currentStage.handleEvent(event);
        if (this.currentStage.isCompleted()) {
            this.setStage(this.currentStage.getNextStage());
        }
    }

    private setStage(stage: Stage) {
        this.currentStage = stage;
        this.gameState.currentStage = this.currentStage.toString();
    }
}

/**
 * Default stage.
 * Completes when both players toggled ready button.
 */
class PrepareStage implements Stage {
    private playerReady: boolean;
    private opponentReady: boolean;
    private readonly gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    isCompleted(): boolean {
        return this.playerReady && this.opponentReady;
    }

    handleEvent(event: GameEvent): void {
        if (event.type === EventType.readyToggle) {
            const readyEvent = event as ReadyEvent;
            if (readyEvent.payload.player === this.gameState.player) {
                this.playerReady = !this.playerReady;
            } else if (readyEvent.payload.player === this.gameState.opponent) {
                this.opponentReady = !this.opponentReady;
            } else {
                console.warn(`Unknown player ${readyEvent.payload.player}`)
            }
        }
    }

    getNextStage(): Stage {
        if (!this.isCompleted()) throw new Error("Stage is not completed yet");
        return new ShipPlacementStage(this.gameState);
    }

    toString() {
        return "Prepare Stage";
    }
}

/**
 * Activates after the prepare stage.
 * Completes after both fields are valid and both players have confirmed their placements
 */
class ShipPlacementStage implements Stage {
    private readonly gameState: GameState;
    private playerGameBoardBuilder: GameBoardBuilder;
    private opponentGameBoardBuilder: GameBoardBuilder;
    private playerReady: boolean;
    private opponentReady: boolean;

    constructor(gameState: GameState) {
        this.gameState = gameState;
        this.playerGameBoardBuilder = new GameBoardBuilderImpl();
        this.opponentGameBoardBuilder = new GameBoardBuilderImpl();
    }

    isCompleted(): boolean {
        return this.playerReady && this.opponentReady;
    }

    handleEvent(event: ShipPlacementEvent | ReadyEvent): void {
        if (event.type === EventType.shipPlacement) {
            const shipPlacementEvent = event as ShipPlacementEvent;
            if (shipPlacementEvent.payload.player === this.gameState.player) {
                const ship = new Ship(shipPlacementEvent.payload.coordinates);
                this.playerGameBoardBuilder.placeShip(ship);
            } else if (shipPlacementEvent.payload.player === this.gameState.player) {
                const ship = new Ship(shipPlacementEvent.payload.coordinates);
                this.playerGameBoardBuilder.placeShip(ship);
            } else {
                console.warn(`Unknown player ${shipPlacementEvent.payload.player}`);
            }
        } else if(event.type === EventType.readyToggle) {
            const readyEvent = event as ReadyEvent;
            if (readyEvent.payload.player === this.gameState.player) {
                this.gameState.player.gameBoard = this.playerGameBoardBuilder.build();
                this.playerReady = !this.playerReady;
            } else if (readyEvent.payload.player === this.gameState.opponent) {
                this.gameState.opponent.gameBoard = this.playerGameBoardBuilder.build();
                this.opponentReady = !this.opponentReady;
            } else {
                console.warn(`Unknown player ${readyEvent.payload.player}`);
            }
        }
    }

    getNextStage(): Stage {
        if (!this.isCompleted()) throw '';
        return new PlayStage(this.gameState);
    }

    toString() {
        return "Ship placement Stage"
    }
}

/**
 * Activates after the placement stage.
 * Completes when any of players destroys opponent's fleet
 */
class PlayStage implements Stage {
    private readonly gameState: GameState;
    private readonly playerBoardShotHandler: BoardShotHandler;
    private readonly opponentBoardShotHandler: BoardShotHandler;

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    handleEvent(event: ShotEvent): void {
        if (event.type === EventType.shot) {
            const shotEvent = event as ShotEvent;
            if ( this.gameState.turn === GameTurn.player && shotEvent.payload.player === this.gameState.player) {
                this.playerBoardShotHandler.handleShot({x: shotEvent.payload.x, y: shotEvent.payload.y});
                this.gameState.turn = GameTurn.opponent;
            } else if (this.gameState.turn === GameTurn.opponent && shotEvent.payload.player === this.gameState.opponent) {
                this.opponentBoardShotHandler.handleShot({x: shotEvent.payload.x, y: shotEvent.payload.y});
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

class GameOverStage implements Stage {

    handleEvent(event: GameEvent): void {
    }

    getNextStage(): Stage {
        return null;
    }

    isCompleted(): boolean {
        return false;
    }

    toString() {
        return "Game over Stage"
    }
}