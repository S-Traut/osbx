import { Color, V2 } from "../core/utils";

export type Hitobject = {
    startTime: number;
    position: V2;
    color: Color;
}

type SliderNode = {
    x: number,
    y: number,
    t: number,
}