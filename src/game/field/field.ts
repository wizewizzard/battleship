import {FieldBuilder} from '../_interfaces';
import Ship from "../ship";

export class Field{

}

class FieldBuilderImpl implements FieldBuilder {
    build(): Field {
        return undefined;
    }

    placeShip(ship: Ship): void {
    }

}