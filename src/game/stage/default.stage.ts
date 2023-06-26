import { GameEvent } from "../_interfaces";
import { GameState } from "../game";
import { PrepareStage } from "./prepare.stage";
import { Stage } from "./stage.interface";

export class DefaultStage implements Stage {

    constructor(private readonly gameState: GameState) {}

    handleEvent(event: GameEvent): void {
        console.log('Blank stage is active. Do nothing.')
    }

    isCompleted: () => true;

    getNextStage(): Stage {
        return new PrepareStage(this.gameState);
    }
}