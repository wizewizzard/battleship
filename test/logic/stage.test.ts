import GameStageManager from "../../src/game/stage";
import {BattleShipPlayer, GameState} from "../../src/game/game";
import {ReadyEvent, ShipPlacementEvent, ShotEvent} from "../../src/game/event";
import {expect} from "chai";
import {placement1, placement2} from "../util/placement";

describe("Stage dispatching", () => {

    it('Should change stages: prepare -> ship placement -> battle -> game over -> prepare', () => {
        const player = new BattleShipPlayer("Aleksey");
        const opponent = new BattleShipPlayer("Cpt. Jack Sparrow");
        const gameState = new GameState(player, opponent);
        const gameStageManager = new GameStageManager(gameState);

        const playerReadyEvent = new ReadyEvent(player);
        const opponentReadyEvent = new ReadyEvent(opponent);
        gameStageManager.dispatch(playerReadyEvent);
        gameStageManager.dispatch(opponentReadyEvent);

        expect(gameState.currentStage).to.equal("Ship placement Stage");

        placement1.map(s => new ShipPlacementEvent(player, s))
            .forEach(e => gameStageManager.dispatch(e));
        placement2.map(s => new ShipPlacementEvent(opponent, s))
            .forEach(e => gameStageManager.dispatch(e));
        gameStageManager.dispatch(playerReadyEvent);
        gameStageManager.dispatch(opponentReadyEvent);

        expect(gameState.currentStage).to.equal("Battle Stage");

        // Player shoots precisely in the opponent's ships
        placement2.map(s => s.coordinates).flat().forEach(coordinate => {
            gameStageManager.dispatch(new ShotEvent(player, {x: coordinate.x, y: coordinate.y}));
            gameStageManager.dispatch(new ShotEvent(opponent, {x: 0, y: 0}));
        });
    });
});
