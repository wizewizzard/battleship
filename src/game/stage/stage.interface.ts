import { GameEvent } from "../_interfaces";

export interface Stage {
    handleEvent(event: GameEvent): void;
    isCompleted: () => boolean;
    getNextStage(): Stage;
}