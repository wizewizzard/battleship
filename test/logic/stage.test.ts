import GameStageController from "../../src/game/stage";
import {BattleShipPlayer, GameState} from "../../src/game/game";
import {ReadyEvent} from "../../src/game/event";
import {expect} from "chai";

describe("Stage dispatching", () => {
    it('Should place a ship', () => {
        const player = new BattleShipPlayer("Aleksey");
        const opponent = new BattleShipPlayer("Cpt. Jack Sparrow");
        const gameState = new GameState(player, opponent);
        const gameStageController = new GameStageController(gameState);

        const playerReadyEvent = new ReadyEvent(player);
        const opponentReadyEvent = new ReadyEvent(opponent);
        gameStageController.dispatch(playerReadyEvent);
        gameStageController.dispatch(opponentReadyEvent);

        expect(gameState.player.ready).to.equal(true);
        expect(gameState.opponent.ready).to.equal(true);
    });
});
