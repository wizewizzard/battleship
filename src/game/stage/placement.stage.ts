import { EventType } from "../_enums";
import { GameBoardBuilder } from "../board/builder.interface";
import { GameBoardBuilderImpl } from "../board/board.builder";
import { GameEvent, ReadyEvent, ShipPlacementEvent } from "../event/event";
import { EventEmitter } from "../event/event-emitter";
import { GameState } from "../game";
import { PlayStage } from "./play.stage";
import { Stage } from "./stage.interface";

/**
 * Activates after the prepare stage.
 * Completes after both fields are valid and both players have confirmed their placements
 */
export class ShipPlacementStage implements Stage {
    private playerGameBoardBuilder: GameBoardBuilder;
    private opponentGameBoardBuilder: GameBoardBuilder;
    private playerReady: boolean;
    private opponentReady: boolean;

    constructor(private readonly gameState: GameState,
        private readonly eventEmitter: EventEmitter) {
        this.playerGameBoardBuilder = new GameBoardBuilderImpl();
        this.opponentGameBoardBuilder = new GameBoardBuilderImpl();
    }

    isCompleted(): boolean {
        return this.playerReady && this.opponentReady;
    }

    handleEvent(event: GameEvent): void {
        if (event.type === EventType.shipPlacement) {
            const shipPlacementEvent = event as ShipPlacementEvent;
            const ship = shipPlacementEvent.payload.ship;
            if (shipPlacementEvent.payload.player === this.gameState.player) {
                this.playerGameBoardBuilder.placeShip(ship);
            } else if (shipPlacementEvent.payload.player === this.gameState.opponent) {
                this.opponentGameBoardBuilder.placeShip(ship);
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
        return new PlayStage(this.gameState, this.eventEmitter);
    }

    toString() {
        return "Ship placement Stage"
    }
}
