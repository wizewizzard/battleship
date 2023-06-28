import GameStageManager from "../../src/game/stage/stage-manager";
import {BattleShipPlayer, GameState} from "../../src/game/game";
import {ReadyEvent, ShipPlacementEvent, ShotEvent} from "../../src/game/event/event";
import {expect} from "chai";
import {getTestShooter, placement1, placement2} from "../util/placement";
import { EventType, GameTurn } from "../../src/game/_enums";
import * as sinon from "sinon";
import { EventEmitter } from "../../src/game/event/event-emitter";

class Foo {
    constructor(private readonly name: string) {}

    printName() {
        console.log(this.name);
        return this.name.toUpperCase();
    }
}

describe("Stage dispatching", () => {
    it('Test subs', () => {
        const ale = sinon.stub(new Foo('ale'));
        
        console.log(ale.printName());
    });
    it('Should change stages: prepare -> ship placement -> battle -> game over -> prepare', () => {
        const player = new BattleShipPlayer("Aleksey");
        const opponent = new BattleShipPlayer("Cpt. Jack Sparrow");
        const gameState = new GameState(player, opponent);
        const eventEmitter = sinon.stub(new EventEmitter());
        const gameStageManager = new GameStageManager(gameState, eventEmitter);
        gameStageManager.dispatch({type: EventType.blank})
        const playerReadyEvent: ReadyEvent = {
            type: EventType.readyToggle,
            payload: {
                player: player
            }
        };
        const opponentReadyEvent: ReadyEvent = {
            type: EventType.readyToggle,
            payload: {
                player: opponent
            }
        };
        gameStageManager.dispatch(playerReadyEvent);
        gameStageManager.dispatch(opponentReadyEvent);

        expect(gameState.currentStage).to.equal("Ship placement Stage");

        placement1.map(s => ({
            type: EventType.shipPlacement,
            payload: {
                player: player,
                ship: s
            }
        })).forEach(e => gameStageManager.dispatch(e));
        placement2.map(s => ({
            type: EventType.shipPlacement,
            payload: {
                player: opponent,
                ship: s
            }
        })).forEach(e => gameStageManager.dispatch(e));
        gameStageManager.dispatch(playerReadyEvent);
        gameStageManager.dispatch(opponentReadyEvent);

        expect(gameState.currentStage).to.equal("Battle Stage");

        const [hitPlayer, missPlayer] = getTestShooter(gameState.player.gameBoard);
        const [hitOpponent, missOpponent] = getTestShooter(gameState.opponent.gameBoard);
        // Player shoots precisely in the opponent's ships, and opponent always misses

        for (let i = 0; i < 40; i ++) {
            if (gameState.turn === GameTurn.player) {
                const coordinate = hitOpponent();
                const sh: ShotEvent = {
                    type: EventType.shot,
                    payload: {
                        player,
                        coordinate
                    }
                };
                gameStageManager.dispatch(sh);
            } else {
                const coordinate = missPlayer();
                const sh = {
                    type: EventType.shot,
                    payload: {
                        player: opponent,
                        coordinate
                    }
                };
                gameStageManager.dispatch(sh);
            }
        }
        expect(gameState.currentStage).to.equal("Game over Stage");
    });
});
