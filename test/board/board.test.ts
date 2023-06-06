import { expect } from 'chai';
import {GameBoardBuilderImpl} from '../../src/game/board/builder';
import 'mocha';
import Ship from "../../src/game/ship";
import * as _ from "lodash";

describe('Board builder tests', () => {
    it('Should place a ship', () => {
        const builder = new GameBoardBuilderImpl();
        const ship = new Ship([{x: 0, y: 1}]);
        builder.placeShip(ship);
    });
    it('Should throw exception when creating empty ship', () => {
        const builder = new GameBoardBuilderImpl();
        const ship1 = new Ship([{x: 0, y: 1}]);
        const ship2 = new Ship([{x: 0, y: 1}]);
        builder.placeShip(ship1);
        expect(() =>  builder.placeShip(ship2)).to.throw('Ship cannot be placed here');

    });
    it('Should conclude whether a ship contains or not the cell with given coordinates', () => {
        const builder = new GameBoardBuilderImpl();
        const ship = new Ship([{x: 0, y: 1}, {x:-1, y: 1}]);
        expect(() =>  builder.placeShip(ship)).to.throw('Ship cannot be placed here');
    });

    it('Should throw exception when creating ship close to another', () => {
        const builder = new GameBoardBuilderImpl();
        const ship = new Ship([{x: 0, y: 1}, {x:-1, y: 1}]);
        expect(() =>  builder.placeShip(ship)).to.throw('Ship cannot be placed here');
    });

    /**
     *   0 1 2 3 4 5 6 7 8 9
     * 0 *   * * * *
     * 1 *
     * 2
     * 3
     * 4
     * 5
     * 6
     * 7
     * 8
     * 9
     */

    it('Should throw exception when creating ship close to another', () => {
        const builder = new GameBoardBuilderImpl();
        const ship1 = new Ship([{x: 0, y: 0}, {x: 0, y: 1}]);
        const ship2 = new Ship([{x: 2, y: 0}, {x:3, y: 0}, {x:4, y: 0}, {x:5, y: 0}]);
        const ship3 = new Ship([{x: 0, y: 2}]);
        builder.placeShip(ship1);
        builder.placeShip(ship2);

        expect(() =>  builder.placeShip(ship3)).to.throw('Ship cannot be placed here');
    });

    /**
     *   0 1 2 3 4 5 6 7 8 9
     * 0 *   * * * *       *
     * 1 *             *
     * 2
     * 3 * * *
     * 4             *     *
     * 5             *
     * 6   *
     * 7               * * *
     * 8 *
     * 9 *
     */
    it('Should build a board', () => {
        const builder = new GameBoardBuilderImpl();
        builder.placeShip(new Ship([{x: 0, y: 0}, {x: 0, y: 1}]));
        builder.placeShip(new Ship([{x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}]));
        builder.placeShip(new Ship([{x: 9, y: 0}]));
        builder.placeShip(new Ship([{x: 7, y: 1}]));
        builder.placeShip(new Ship([{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}]));
        builder.placeShip(new Ship([{x: 6, y: 4}, {x: 6, y: 5}]));
        builder.placeShip(new Ship([{x: 9, y: 4}]));
        builder.placeShip(new Ship([{x: 1, y: 6}]));
        builder.placeShip(new Ship([{x: 7, y: 7}, {x:8, y: 7}, {x:9, y: 7}]));
        builder.placeShip(new Ship([{x: 0, y: 8}, {x:0, y: 8}]));

        expect(() => builder.build()).not.to.throw()
    });

    it('Should not build an invalid board', () => {
        const builder = new GameBoardBuilderImpl();
        builder.placeShip(new Ship([{x: 0, y: 0}, {x: 0, y: 1}]));
        builder.placeShip(new Ship([{x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}]));
        builder.placeShip(new Ship([{x: 9, y: 0}]));
        builder.placeShip(new Ship([{x: 7, y: 1}]));
        builder.placeShip(new Ship([{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}]));
        builder.placeShip(new Ship([{x: 6, y: 4}, {x: 6, y: 5}]));
        builder.placeShip(new Ship([{x: 9, y: 4}]));
        builder.placeShip(new Ship([{x: 1, y: 6}]));
        builder.placeShip(new Ship([{x: 7, y: 7}, {x:8, y: 7}, {x:9, y: 7}]));

        expect(() => builder.build()).to.throw('There must be three ships of size 2');
    });


    it('Should return ship at the given coords', () => {
        const builder = new GameBoardBuilderImpl();
        const ship1 = new Ship([{x: 0, y: 0}, {x: 0, y: 1}]);
        const ship2 = new Ship([{x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}]);
        builder.placeShip(ship1);
        builder.placeShip(ship2);
        builder.placeShip(new Ship([{x: 9, y: 0}]));
        builder.placeShip(new Ship([{x: 7, y: 1}]));
        builder.placeShip(new Ship([{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}]));
        builder.placeShip(new Ship([{x: 6, y: 4}, {x: 6, y: 5}]));
        builder.placeShip(new Ship([{x: 9, y: 4}]));
        builder.placeShip(new Ship([{x: 1, y: 6}]));
        builder.placeShip(new Ship([{x: 7, y: 7}, {x:8, y: 7}, {x:9, y: 7}]));
        builder.placeShip(new Ship([{x: 0, y: 8}, {x:0, y: 8}]));
        const board = builder.build();

        const shipAtCoordinate1 = board.getShipAtCoordinate({x: 0, y: 1});
        const shipAtCoordinate2 = board.getShipAtCoordinate({x:2, y: 0});

        _.isEqual(shipAtCoordinate1, ship1);
        _.isEqual(shipAtCoordinate2, ship2);
    });
});