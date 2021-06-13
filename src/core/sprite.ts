import Parameter from "./parameter";
import { V2 } from "./utils"

export default class Sprite {

    options: string | undefined;
    layer: string;
    parameters: Parameter[] = [];

    constructor(path: string, layer: string, origin: string, position: V2) {
        this.options = `Sprite,${layer},${origin},"${path}",${position.x},${position.y}`;
        this.layer = layer;
    }

    /**
    * Opacity manipulation for a Sprite.
    * @output F,0,ST,ET,SV,EV
    * @return void
    */
    Fade(startTime: number, endTime: number, startValue: number, endValue: number): void;
    Fade(easing: number, startTime: number, endTime: number, startValue: number, endValue: number): void;
    Fade(startTime: number, endTime: number, startValue: number, endValue: number, easing?: number): void {
        this.parameters.push(new Parameter("F", [easing ? easing : 0, startTime, endTime, startValue, endValue]));
    }

    /**
    * Scale manipulation for a Sprite.
    * @output F,0,ST,ET,SV,EV
    * @return void
    */
    Scale(startTime: number, endTime: number, startValue: number, endValue: number): void;
    Scale(easing: number, startTime: number, endTime: number, startValue: number, endValue: number): void;
    Scale(startTime: number, endTime: number, startValue: number, endValue: number, easing?: number): void {
        this.parameters.push(new Parameter("S", [easing ? easing : 0, startTime, endTime, startValue, endValue]));
    }

}
