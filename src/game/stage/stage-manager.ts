import {GameState} from "../game";
import {Stage} from "./stage.interface";
import {DefaultStage} from "./default.stage";
import { GameEvent } from "../event/event";
import {EventEmitter} from "../event/event-emitter";

export default class GameStageManager {

    constructor(
        private readonly gameState: GameState,
        private readonly eventEmitter: EventEmitter,
        private currentStage?: Stage) {
        if (!currentStage) {
            currentStage = this.getDefaultStage();
        }
        this.switchStage(currentStage);
    }
    
    dispatch(event: GameEvent) {
        this.currentStage.handleEvent(event);
        if (this.currentStage.isCompleted()) {
            this.switchStage(this.currentStage.getNextStage());
        }
    }

    private getDefaultStage(): Stage {
       return new DefaultStage(this.gameState, this.eventEmitter);
    }

    private switchStage(stage: Stage) {
        this.currentStage = stage;
        this.gameState.currentStage = this.currentStage.toString();
    }
}
