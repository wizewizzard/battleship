import Ship from "../../src/game/ship";

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