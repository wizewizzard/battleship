import BoardShotHandler from "../../src/game/board/shooting";
import {GameBoardBuilderImpl} from "../../src/game/board/builder";
import {placement1} from "../util/placement";
import {assert, expect} from "chai";
import {FieldCellHit, FieldCellShip, ShipState} from "../../src/game/_enums";

describe("Shot handler test", () => {
    it("Should destroy the ship", () => {
        const builder = new GameBoardBuilderImpl();
        placement1.forEach(s => builder.placeShip(s));
        let ship1 = placement1[0];
        let ship2 = placement1[7];
        const gameBoard = builder.build();
        const shotHandler = new BoardShotHandler(gameBoard);

        [...ship1.coordinates, ...ship2.coordinates].forEach(c => shotHandler.handleShot(c));

        const shipsToBeSunk = gameBoard.ships.filter(s => s.state === ShipState.sunk);
        const cells = [...ship1.coordinates, ...ship2.coordinates].map(c => gameBoard.board[c.y][c.x]);
        assert.equal(shipsToBeSunk.length, 2);
        assert.isTrue(cells.every(c => c.ship === FieldCellShip.ship && c.hit === FieldCellHit.hit));
    });
});
