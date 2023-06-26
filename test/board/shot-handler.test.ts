import BoardShotHandler from "../../src/game/board/shooting";
import { GameBoardBuilderImpl } from "../../src/game/board/builder";
import { getTestShooter, placement1 } from "../util/placement";
import { assert } from "chai";
import { FieldCellHit, FieldCellShip, ShipState } from "../../src/game/_enums";
import Keys from "../../src/keys";

describe("Shot handler test", () => {
    it("Should destroy the ship", () => {
        let shipsDestroyedCallbackCount = 0;
        let shipsHitCallbackCount = 0;
        const builder = new GameBoardBuilderImpl();
        placement1.forEach(s => builder.placeShip(s));
        let ship1 = placement1[0];
        let ship2 = placement1[7];
        const gameBoard = builder.build();
        const shotHandler = new BoardShotHandler(gameBoard);

        [...ship1.coordinates, ...ship2.coordinates].forEach(c => shotHandler.handleShot(c,
            () => shipsHitCallbackCount++,
            () => { },
            () => shipsDestroyedCallbackCount++)
        );

        const shipsToBeSunk = gameBoard.ships.filter(s => s.state === ShipState.sunk);
        const cells = [...ship1.coordinates, ...ship2.coordinates].map(c => gameBoard.board[c.y][c.x]);
        assert.equal(shipsToBeSunk.length, 2);
        assert.isTrue(cells.every(c => c.ship === FieldCellShip.ship && c.hit === FieldCellHit.hit));
        assert.equal(shipsDestroyedCallbackCount, 2);
        assert.equal(shipsHitCallbackCount, [...ship1.coordinates, ...ship2.coordinates].length);
    });

    it("Should hit but not destroy the ship", () => {
        let shipsHitCallbackCount = 0;
        let shipsDestroyedCallbackCount = 0;
        const builder = new GameBoardBuilderImpl();
        placement1.forEach(s => builder.placeShip(s));
        const gameBoard = builder.build();
        const shotHandler = new BoardShotHandler(gameBoard);
        const cellsToHit = placement1.filter(s => s.size > 1)
            .map(s => s.coordinates[0]);
        cellsToHit.forEach(c => shotHandler.handleShot(c,
            () => shipsHitCallbackCount++,
            () => { },
            (s) => {
                console.log(s);
                shipsDestroyedCallbackCount++
            })
        );

        assert.equal(shipsHitCallbackCount, 6);
        assert.equal(shipsDestroyedCallbackCount, 0);
        assert.isTrue(cellsToHit.every(c => gameBoard.board[c.y][c.x].hit === FieldCellHit.hit))
    });

    it("Should destroy the fleet", () => {
        let fleetDestroyed = false;
        const builder = new GameBoardBuilderImpl();
        placement1.forEach(s => builder.placeShip(s));
        const gameBoard = builder.build();
        const shotHandler = new BoardShotHandler(gameBoard);

        [...placement1].map(s => s.coordinates).flat().forEach(c => shotHandler.handleShot(c,
            () => { },
            () => { },
            () => { },
            () => fleetDestroyed = true));

        assert.isTrue(fleetDestroyed);
    });

    it("Should register all misses", () => {
        let fleetDestroyed = false;
        let shipsHitCallbackCount = 0;
        let missCallbackCount = 0;
        let shipsDestroyedCallbackCount = 0;
        const builder = new GameBoardBuilderImpl();
        placement1.forEach(s => builder.placeShip(s));
        const gameBoard = builder.build();
        const shotHandler = new BoardShotHandler(gameBoard);
        const shipsCoords = [...placement1].map(s => s.coordinates).flat();

        for (let row = 0; row < Keys.boardSize; row++) {
            for (let col = 0; col < Keys.boardSize; col++) {
                if (shipsCoords.findIndex(c => c.x === col && c.y === row) === -1) {
                    shotHandler.handleShot({ x: col, y: row },
                        () => shipsHitCallbackCount++,
                        () => missCallbackCount++,
                        () => shipsDestroyedCallbackCount++,
                        () => fleetDestroyed = true);
                }
            }
        }

        assert.equal(shipsHitCallbackCount, 0);
        assert.equal(missCallbackCount, 80);
        assert.equal(shipsDestroyedCallbackCount, 0);
        assert.isFalse(fleetDestroyed);
    });
});
