import Parameter from "./parameter";
import { Color, V2 } from "./utils"

export default class Sprite {

    type: string = "sprite";
    options: string | undefined;
    layer: string;
    parameters: Parameter[] = [];

    constructor()
    constructor(path: string, layer: string, origin: string, position: V2)
    constructor(path?: string, layer?: string, origin?: string, position?: V2) {
        if (!path) this.type = "loop";
        this.options = `Sprite,${layer},${origin},"${path}",${position?.x},${position?.y}`;
        this.layer = layer ?? "none";
    }

    /**
    * Modify the opacity of your sprite. The opacity of a sprite is between 0.0 and 1.0.
    * @param startTime In milliseconds
    * @param startValue Between 0 and 1
    * @param easing https://easings.net/
    * @return void
    */
    Fade(startTime: number, startValue: number): Parameter;
    Fade(startTime: number, startValue: number, endTime: number, endValue: number): Parameter;
    Fade(startTime: number, startValue: number, endTime: number, endValue: number, easing: number): Parameter;
    Fade(startTime: number, startValue: number, endTime?: number, endValue?: number, easing?: number): Parameter {
        let parameter = endTime == undefined ?
            new Parameter("F", [easing ?? 0, startTime, endTime, startValue]) :
            new Parameter("F", [easing ?? 0, startTime, endTime, startValue, endValue]);
        this.parameters.push(parameter);
        return parameter;
    }

    /**
    * Modify the scale of your sprite, this apply changes on the X and Y scale at the same time.
    * Be careful, osu! blur your images when they get above 0.333333333 scale because of the aspect ratio.
    * @param startTime In milliseconds
    * @param startValue From 0 to ∞
    * @param easing https://easings.net/
    * @return void
    */
    Scale(startTime: number, startValue: number): void;
    Scale(startTime: number, startValue: number, endTime: number, endValue: number): void;
    Scale(startTime: number, startValue: number, endTime: number, endValue: number, easing: number): void;
    Scale(startTime: number, startValue: number, endTime?: number, endValue?: number, easing?: number): void {
        this.parameters.push(endTime == undefined ?
            new Parameter("S", [easing ?? 0, startTime, endTime, startValue]):
            new Parameter("S", [easing ?? 0, startTime, endTime, startValue, endValue])
        );
    }


    /**
    * Modify the scale of your sprite, this apply changes on the X and Y separately.
    * For example, you can scale your sprite only in X by not changing Y value.
    * @param startTime In milliseconds
    * @param startValue V2 - {x:0.5, y:0.1}
    * @param easing https://easings.net/
    * @return void
    */
    ScaleVec(startTime: number, startValue: V2): void;
    ScaleVec(startTime: number, startValue: V2, endTime: number, endValue: V2): void;
    ScaleVec(startTime: number, startValue: V2, endTime: number, endValue: V2, easing: number): void;
    ScaleVec(startTime: number, startValue: V2, endTime?: number, endValue?: V2, easing?: number): void {
        this.parameters.push(endTime == undefined ?
            new Parameter("V", [easing ?? 0, startTime, endTime, startValue.x, startValue.y]):
            new Parameter("V", [easing ?? 0, startTime, endTime, startValue.x, startValue.y, endValue?.x, endValue?.y])
        );
    }

    /**
    * Modify your sprite position on the screen, if you want to make your sprite move, specify a start and end Time, and a start and end value.
    * @warning This function is not compatible with MoveX & MoveY, either only use MoveX | MoveY or Move.
    * @param startTime In milliseconds
    * @param startValue A number
    * @param easing https://easings.net/
    * @return void
    */
    Move(startTime: number, startValue: V2): void;
    Move(startTime: number, startValue: V2, endTime: number, endValue: V2): void;
    Move(startTime: number, startValue: V2, endTime: number, endValue: V2, easing: number): void;
    Move(startTime: number, startValue: V2, endTime?: number, endValue?: V2, easing?: number): void {
        this.parameters.push(endTime == undefined ?
            new Parameter("M", [easing ?? 0, startTime, endTime, startValue.x, startValue.y]):
            new Parameter("M", [easing ?? 0, startTime, endTime, startValue.x, startValue.y, endValue?.x, endValue?.y])
        );
    }

    /**
    * Modify your sprite position only on the X axis.
    * @warning This function is not compatible with Move, either only use MoveX | MoveY or Move.
    * @param startTime In milliseconds
    * @param startValue A number
    * @param easing https://easings.net/
    * @return void
    */
    MoveX(startTime: number, startValue: number): void;
    MoveX(startTime: number, startValue: number, endTime: number, endValue: number): void;
    MoveX(startTime: number, startValue: number, endTime: number, endValue: number, easing: number): void;
    MoveX(startTime: number, startValue: number, endTime?: number, endValue?: number, easing?: number): void {
        this.parameters.push(endTime == undefined ?
            new Parameter("MX", [easing ?? 0, startTime, endTime, startValue]):
            new Parameter("MX", [easing ?? 0, startTime, endTime, startValue, endValue])
        );
    }


    /**
    * Modify your sprite position only on the Y axis.
    * @warning This function is not compatible with Move, either only use MoveX | MoveY or Move.
    * @param startTime In milliseconds
    * @param startValue A number
    * @param easing https://easings.net/
    * @return void
    */
    MoveY(startTime: number, startValue: number): void;
    MoveY(startTime: number, startValue: number, endTime: number, endValue: number): void;
    MoveY(startTime: number, startValue: number, endTime: number, endValue: number, easing: number): void;
    MoveY(startTime: number, startValue: number, endTime?: number, endValue?: number, easing?: number): void {
        this.parameters.push(endTime == undefined ?
            new Parameter("MY", [easing ?? 0, startTime, endTime, startValue]):
            new Parameter("MY", [easing ?? 0, startTime, endTime, startValue, endValue])
        );
    }

    /**
    * Modify the rotation value of your sprite.
    * @param startTime In milliseconds
    * @param startValue Rotation value in radians (0 - 2PI)
    * @param easing https://easings.net/
    * @return void
    */
    Rotate(startTime: number, startValue: number): void;
    Rotate(startTime: number, startValue: number, endTime: number, endValue: number): void;
    Rotate(startTime: number, startValue: number, endTime: number, endValue: number, easing: number): void;
    Rotate(startTime: number, startValue: number, endTime?: number, endValue?: number, easing?: number): void {
        this.parameters.push(endTime == undefined ?
            new Parameter("R", [easing ?? 0, startTime, endTime, startValue]):
            new Parameter("R", [easing ?? 0, startTime, endTime, startValue, endValue])
        );
    }

    /**
    * Modify the color value of your sprite. This will tweak the white values of every sprite pixels.
    * @param startTime In milliseconds
    * @param startValue Color - {r: 255, g: 255, b: 255}
    * @param easing https://easings.net/
    * @return void
    */
    Color(startTime: number, startValue: Color): void;
    Color(startTime: number, startValue: Color, endTime: number, endValue: Color): void;
    Color(startTime: number, startValue: Color, endTime: number, endValue: Color, easing: number): void;
    Color(startTime: number, startValue: Color, endTime?: number, endValue?: Color, easing?: number): void {
        this.parameters.push(endTime == undefined ?
            new Parameter("C", [easing ?? 0, startTime, endTime, startValue.r, startValue.g, startValue.b]):
            new Parameter("C", [easing ?? 0, startTime, endTime, startValue.r, startValue.g, startValue.b, endValue?.r, endValue?.g, endValue?.b])
        );
    }

    /**
    * Change the sprite fusion mode to additive https://en.wikipedia.org/wiki/Additive_color
    * @param startTime In milliseconds
    * @param endTime In milliseconds
    * @return void
    */
    Additive(startTime: number, endTime: number): void {
        this.parameters.push(new Parameter("P", [startTime, endTime], "A"));
    }

    /**
    * @todo comments
    */
    CreateLoop(startTime: number, loop_count: number, build: (loop_object: Sprite) => Sprite) {
        this.parameters.push(new Parameter("L", [startTime, loop_count]));
        build(new Sprite()).parameters.forEach(parameter => {
            this.parameters.push(new Parameter(` ${parameter.type}`, parameter.options, parameter.p_value));
        });
    }
}
