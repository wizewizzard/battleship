import {GameBoardBuilder, GameEvent, Stage} from "./_interfaces";
import {UserEventType} from "./_enums";
import {GameBoardBuilderImpl} from "./board/builder";
import {Point2D} from "./_types";
import {ReadyEvent, ShipPlacementEvent, ShotEvent} from "./event";
import {GameState} from "./game";
import BoardShotHandler from "./board/shooting";

export default class GameStageController {
    private currentStage: Stage;
    private readonly gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    initDefault() {

    }

    dispatch(event: GameEvent) {
        this.currentStage.handleEvent(event);
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
        if (event.type === UserEventType.readyButtonToggle) {
            const readyEvent = event as ReadyEvent;
            if (readyEvent.payload.player === this.gameState.player1) {
                this.player1Ready = !this.player1Ready;
            } else if (readyEvent.payload.player === this.gameState.player2) {
                this.player2Ready = !this.player2Ready;
            } else {
                console.warn(`Unknown player ${readyEvent.payload.player}`)
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

class ShipPlacementStage implements Stage<ShipPlacementEvent> {
    private readonly gameState: GameState;
    private gameBoardBuilder: GameBoardBuilder;
    private readonly onComplete: () => void;

    constructor(gameState: GameState, onComplete: () => void) {
        this.gameState = gameState;
        this.gameBoardBuilder = new GameBoardBuilderImpl();
        this.onComplete = onComplete;
    }

    handleEvent(event: ShipPlacementEvent): void {
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
    private readonly shotHandler1: BoardShotHandler;
    private readonly shotHandler2: BoardShotHandler;
    private readonly onComplete: () => void;

    constructor(gameState: GameState, onComplete: () => void) {
        this.gameState = gameState;
        this.shotHandler1 = new BoardShotHandler(this.gameState.gameBoard1,
            () => {}, () => {}, () => {});
        this.shotHandler2 = new BoardShotHandler(this.gameState.gameBoard2,
            () => {}, () => {}, () => {});
        this.onComplete = onComplete;
    }

    handleEvent(event: ShotEvent): void {
        if (event.type === UserEventType.shot) {
            const shotEvent = event as ShotEvent;
            if ( this.gameState.turn === 1 && shotEvent.payload.player === this.gameState.player1) {
                this.shotHandler1.handleShot({x: shotEvent.payload.x, y: shotEvent.payload.y});
            } else if (this.gameState.turn === 2 && shotEvent.payload.player === this.gameState.player2) {
                this.shotHandler2.handleShot({x: shotEvent.payload.x, y: shotEvent.payload.y});
            } else {
                throw 'You can not perform this action';
            }
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