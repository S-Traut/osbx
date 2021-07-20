import { Color, V2 } from "../core/utils";

export default class Hitobject {
    startTime!: number;
    position!: V2;
    color!: Color;

    constructor(startTime: number, position: V2, color: Color) {
        this.startTime = startTime;
        this.position = position;
        this.color = color;
    }
}
