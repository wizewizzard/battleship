import {Field} from './field/field';
import Ship from './ship';

export interface FieldBuilder {
    placeShip(ship: Ship): void | never;
    build(): Field;
}