import {Point2D} from "./_types";
import * as _ from "lodash";
import ShipPlacementError from "./exception/ShipPlacementError";


export default class Ship {
    readonly coordinates: Array<Point2D>;
    readonly size: number;

    constructor(coordinates: Array<Point2D>, ) {
        if (coordinates.length <= 0) throw new ShipPlacementError('Ship must take at least 1 cell');
        this.coordinates = coordinates.slice();
        this.size = coordinates.length;
    }

    contains(point: Point2D): boolean {
        return this.coordinates.some(p => _.isEqual(p, point));
    }
}