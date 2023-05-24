import { expect } from 'chai';
import {GameBoardBuilderImpl} from '../../src/game/board/gameBoard';
import 'mocha';
import Ship from "../../src/game/ship";

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
});