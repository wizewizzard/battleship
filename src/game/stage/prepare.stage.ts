import { EventType } from "../_enums";
import { GameEvent, ReadyEvent } from "../event/event";
import { EventEmitter } from "../event/event-emitter";
import { GameState } from "../game";
import { ShipPlacementStage } from "./placement.stage";
import { Stage } from "./stage.interface";

/**
 * Default stage.
 * Completes when both players toggled ready button.
 */
export class PrepareStage implements Stage {
    private playerReady: boolean;
    private opponentReady: boolean;

    constructor(private readonly gameState: GameState,
        private readonly eventEmitter: EventEmitter) {
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
        return new ShipPlacementStage(this.gameState, this.eventEmitter);
    }

    toString() {
        return "Prepare Stage";
    }
}