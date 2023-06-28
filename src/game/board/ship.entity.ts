import {Point2D} from "../_interfaces";
import * as _ from "lodash";
import {ShipCreationException} from "../battleship.exception";
import {ShipState} from "./ship-state.enum";

export class Ship {
    readonly coordinates: Point2D[];
    readonly size: number;
    state: ShipState;

    constructor(coordinates: Point2D[]) {
        if (coordinates.length <= 0) throw new ShipCreationException('Ship must take at least 1 cell');
        this.coordinates = coordinates.slice();
        this.size = coordinates.length;
        this.state = ShipState.intact;
    }

    contains(point: Point2D): boolean {
        return this.coordinates.some(p => _.isEqual(p, point));
    }
}