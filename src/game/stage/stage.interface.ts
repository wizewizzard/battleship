import { GameEvent } from "../_interfaces";
import { EventPayload } from "../event-payload.interface";


export interface Stage {
    handleEvent(event: GameEvent): void;
    isCompleted(): boolean;
    getNextStage(): Stage;
}