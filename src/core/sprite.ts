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
    * Modify the opacity of your sprite. The opacity of a sprite is between 0.0 and 1.0.
    * @output F,0,ST,ET,SV,EV
    * @param startTime In milliseconds
    * @param endTime In milliseconds
    * @param startValue Between 0 and 1
    * @param endValue Between 0 and 1
    * @param easing https://easings.net/
    * @return void
    */
    Fade(startTime: number, startValue: number): void;
    Fade(startTime: number, endTime: number, startValue: number, endValue: number): void;
    Fade(startTime: number, endTime: number, startValue: number, endValue: number, easing: number): void;
    Fade(startTime: number, endTime?: number, startValue?: number, endValue?: number, easing?: number): void {
        this.parameters.push(new Parameter("F", [easing ?? 0, startTime, endTime ?? startTime, startValue ?? 1, endValue ?? 1]));
    }

    /**
    * Modify the scale of your sprite, this apply changes on the X and Y scale at the same time.
    * Be careful, osu! blur your images when they get above 0.333333333 scale because of the aspect ratio.
    * @output F,0,ST,ET,SV,EV
    * @return void
    */
    Scale(startTime: number, startValue: number): void;
    Scale(startTime: number, endTime: number, startValue: number, endValue: number): void;
    Scale(startTime: number, endTime: number, startValue: number, endValue: number, easing: number): void;
    Scale(startTime: number, endTime?: number, startValue?: number, endValue?: number, easing?: number): void {
        this.parameters.push(new Parameter("S", [easing ?? 0, startTime, endTime ?? startTime, startValue ?? 1, endValue ?? 1]));
    }

    /**
    * Scale manipulation for a Sprite.
    * @output F,0,ST,ET,SV,EV
    * @return void
    */
    Move(startTime: number, startValue: number): void;
    Move(startTime: number, endTime: number, startValue: number, endValue: number): void;
    Move(startTime: number, endTime: number, startValue: number, endValue: number, easing: number): void;
    Move(startTime: number, endTime?: number, startValue?: number, endValue?: number, easing?: number): void {
        this.parameters.push(new Parameter("M", [easing ?? 0, startTime, endTime ?? startTime, startValue ?? 1, endValue ?? 1]));
    }
}

type decimal = {
    value: number;
}
