import { expect } from 'chai';
import Ship from '../src/game/ship';
import 'mocha';

describe('MyFunction', () => {
    it('should return the correct result', () => {
        const ship = new Ship([{x: 0, y: 1}]);
        expect(ship.size).to.equal(1);
    });
});