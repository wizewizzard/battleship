import { expect } from 'chai';
import Ship from '../src/game/ship';
import 'mocha';

describe('Ship tests', () => {
    it('Should create new ship', () => {
        const ship = new Ship([{x: 0, y: 1}]);
        expect(ship.size).to.equal(1);
    });
    it('Should throw exception when creating empty ship', () => {
        expect(() => new Ship([])).to.throw('Ship must take at least 1 cell');
    });
    it('Should conclude whether a ship contains or not the cell with given coordinates', () => {
        const ship = new Ship([{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}]);
        expect(ship.contains({x: 2, y: 1})).to.equal(true);
        expect(ship.contains({x: 0, y: 1})).to.equal(true);
        expect(ship.contains({x: 1, y: 1})).to.equal(true);
        expect(ship.contains({x: 1, y: 0})).to.equal(false);
    });
});