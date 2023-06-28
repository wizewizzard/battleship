import { GameEvent } from "../event/event";
import { EventPayload } from "../event/event-payload.interface";


export interface Stage {
    handleEvent(event: GameEvent): void;
    isCompleted(): boolean;
    getNextStage(): Stage;
}