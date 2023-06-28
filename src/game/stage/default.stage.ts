import { GameEvent } from "../event/event";
import { EventEmitter } from "../event/event-emitter";
import { GameState } from "../game";
import { PrepareStage } from "./prepare.stage";
import { Stage } from "./stage.interface";

export class DefaultStage implements Stage {

    constructor(private readonly gameState: GameState,
        private readonly eventEmitter: EventEmitter) {}

    handleEvent(event: GameEvent): void {
        console.log('Blank stage is active. Do nothing.')
    }

    isCompleted() {
        return true;
    }

    getNextStage(): Stage {
        return new PrepareStage(this.gameState, this.eventEmitter);
    }
}