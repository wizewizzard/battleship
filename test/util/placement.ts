import Keys from "../../src/keys";
import {Ship} from "../../src/game/board/ship.entity";
import { shuffle } from "./utils";
import { GameBoard } from "../../src/game/board/board.entity";
import { Point2D } from "../../src/game/_interfaces";

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
export const placement1 = [
    new Ship([{x: 0, y: 0}, {x: 0, y: 1}]),
    new Ship([{x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}]),
    new Ship([{x: 9, y: 0}]),
    new Ship([{x: 7, y: 1}]),
    new Ship([{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}]),
    new Ship([{x: 6, y: 4}, {x: 6, y: 5}]),
    new Ship([{x: 9, y: 4}]),
    new Ship([{x: 1, y: 6}]),
    new Ship([{x: 7, y: 7}, {x:8, y: 7}, {x:9, y: 7}]),
    new Ship([{x: 0, y: 8}, {x:0, y: 9}])
];

/**
 *   0 1 2 3 4 5 6 7 8 9
 * 0   *           *
 * 1         *
 * 2   *     *
 * 3   *     *
 * 4   *     *     *
 * 5               *
 * 6 * *     *
 * 7
 * 8 *       * * *
 * 9 *                 *
 */
export const placement2 = [
    new Ship([{x: 1, y: 0}]),
    new Ship([{x: 7, y: 0}]),
    new Ship([{x: 4, y: 1}, {x: 4, y: 2}, {x: 4, y: 3}, {x: 4, y: 4}]),
    new Ship([{x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}]),
    new Ship([{x: 7, y: 4}, {x: 7, y: 5}]),
    new Ship([{x: 0, y: 6}, {x: 1, y: 6}]),
    new Ship([{x: 4, y: 6}]),
    new Ship([{x: 0, y: 8}, {x: 0, y: 9}]),
    new Ship([{x: 4, y: 8}, {x: 5, y: 8}, {x:6, y: 8}]),
    new Ship([{x: 9, y: 9}])
];

export function getTestShooter(gameBoard: GameBoard): [(chance?: number) => Point2D, () => any  ] {
    const shipsCoords = [...gameBoard.ships].map(s => s.coordinates).flat();
    let coordinatesHit: Point2D[] = [];
    let coordinatesMiss: Point2D[] = [];
    
    for (let row = 0; row < Keys.boardSize; row ++) {
        for (let col = 0; col < Keys.boardSize; col ++) {
            if (shipsCoords.findIndex(c => c.x === col && c.y === row) === -1) {
                coordinatesMiss.push({x: col, y: row});
            } else {
                coordinatesHit.push({x: col, y: row});
            }
        }
    }
    coordinatesHit = shuffle(coordinatesHit);
    coordinatesMiss = shuffle(coordinatesMiss);

    const hit = function*(): Generator<Point2D> {
        for (const c of coordinatesHit) {
            yield c;
        }
    }();
    const miss = function*(): Generator<Point2D> {
        for (const c of coordinatesMiss) {
            yield c;
        }
    }();
    return [(chance = 1): Point2D => {
        if (Math.random() < chance) {
            const result = hit.next();
            if (!result.done) {
                return result.value;
            } else {
                throw new Error('Not more hits can be performed');
            }
        } else {
            return this.miss();
        }
    },
    () => {
        const result = miss.next();
        if (!result.done) {
            return result.value;
        } else {
            throw new Error('Not more misses can be performed');
        }
    }];
}