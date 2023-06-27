import {GameEvent} from "../_interfaces";
import {GameState} from "../game";
import {Stage} from "./stage.interface";
import {DefaultStage} from "./default.stage";

export default class GameStageManager {

    constructor(private readonly gameState: GameState,
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
       return new DefaultStage(this.gameState);
    }


    private switchStage(stage: Stage) {
        this.currentStage = stage;
        this.gameState.currentStage = this.currentStage.toString();
    }
}
