import {Point2D} from "./_types";
import * as _ from "lodash";
import ShipCreationError from "./exception/ShipCreationError";
import {ShipState} from "./_enums";


export default class Ship {
    readonly coordinates: Point2D[];
    readonly size: number;
    state: ShipState;

    constructor(coordinates: Point2D[]) {
        if (coordinates.length <= 0) throw new ShipCreationError('Ship must take at least 1 cell');
        this.coordinates = coordinates.slice();
        this.size = coordinates.length;
        this.state = ShipState.intact;
    }

    contains(point: Point2D): boolean {
        return this.coordinates.some(p => _.isEqual(p, point));
    }
}