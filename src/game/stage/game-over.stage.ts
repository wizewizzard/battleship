import { GameEvent } from "../_interfaces";
import { Stage } from "./stage.interface";

export class GameOverStage implements Stage {

    handleEvent(event: GameEvent): void {
    }

    getNextStage(): Stage {
        return {
            getNextStage: null,
            handleEvent: null,
            isCompleted: null
        };
    }

    isCompleted(): boolean {
        return false;
    }

    toString() {
        return "Game over Stage"
    }
}