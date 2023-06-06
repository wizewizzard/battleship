import {GameBoardBuilder, GameEvent, Stage} from "./_interfaces";
import {GameTurn, UserEventType} from "./_enums";
import {GameBoardBuilderImpl} from "./board/builder";
import {ReadyEvent, ShipPlacementEvent, ShotEvent} from "./event";
import {GameState} from "./game";
import BoardShotHandler from "./board/shooting";
import Ship from "./ship";

export default class GameStageController {
    private currentStage: Stage;
    private readonly gameState: GameState;
    private mapping: any[];

    constructor(gameState: GameState) {
        this.gameState = gameState;
        this.mapping = [
            {
                new PrepareStage(this.gameState, )
            }
        ]
    }

    initDefault() {
        this.currentStage = new PrepareStage(this.gameState, this.moveToNextStage(new ShipPlacementStage()));
        this.currentStage.
    }

    dispatch(event: GameEvent) {
        this.currentStage.handleEvent(event);
        if (this.currentStage.isCompleted) {
            this.currentStage = this.currentStage.getNextStage();
        }
    }

    moveToNextStage(nextStage: Stage) {
        this.currentStage =
    }
}

class PrepareStage implements Stage {
    private playerReady: boolean;
    private opponentReady: boolean;
    private readonly gameState: GameState;

    constructor(gameState: GameState, onComplete: () => void) {
        this.gameState = gameState;
    }

    isCompleted(): boolean {
        return this.playerReady && this.opponentReady;
    }

    handleEvent(event: GameEvent): void {
        if (event.type === UserEventType.readyButtonToggle) {
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
        if (!this.isCompleted()) throw '';
        return new ShipPlacementStage(this.gameState);
    }
}

class ShipPlacementStage implements Stage {
    private readonly gameState: GameState;
    private playerGameBoardBuilder: GameBoardBuilder;
    private oppponentGameBoardBuilder: GameBoardBuilder;
    private playerReady: boolean;
    private opponentReady: boolean;
    private readonly onComplete: () => void;

    constructor(gameState: GameState) {
        this.gameState = gameState;
        this.playerGameBoardBuilder = new GameBoardBuilderImpl();
        this.oppponentGameBoardBuilder = new GameBoardBuilderImpl();
    }

    isCompleted(): boolean {
        return this.playerReady && this.opponentReady;
    }

    handleEvent(event: ShipPlacementEvent | ReadyEvent): void {
        if (event.type === UserEventType.shipPlacement) {
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
        } else if(event.type === UserEventType.readyButtonToggle) {
            const readyEvent = event as ReadyEvent;
            if (readyEvent.payload.player === this.gameState.player) {
                try {

                }
                this.playerReady = !this.playerReady;
            } else if (readyEvent.payload.player === this.gameState.opponent) {
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
}

class PlayStage implements Stage {
    private readonly gameState: GameState;
    private readonly playerBoardShotHandler: BoardShotHandler;
    private readonly opponentBoardShotHandler: BoardShotHandler;

    constructor(gameState: GameState) {
        this.gameState = gameState;
        this.playerBoardShotHandler = new BoardShotHandler(this.gameState.player.gameBoard,
            () => {}, () => {}, () => {});
        this.opponentBoardShotHandler = new BoardShotHandler(this.gameState.opponent.gameBoard,
            () => {}, () => {}, () => {});
    }

    handleEvent(event: ShotEvent): void {
        if (event.type === UserEventType.shot) {
            const shotEvent = event as ShotEvent;
            if ( this.gameState.turn === GameTurn.player && shotEvent.payload.player === this.gameState.player.player) {
                this.playerBoardShotHandler.handleShot({x: shotEvent.payload.x, y: shotEvent.payload.y});
            } else if (this.gameState.turn === GameTurn.opponent && shotEvent.payload.player === this.gameState.opponent.player) {
                this.opponentBoardShotHandler.handleShot({x: shotEvent.payload.x, y: shotEvent.payload.y});
            } else {
                throw 'You can not perform this action';
            }
        }
    }

    isCompleted(): boolean {
        return false;
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