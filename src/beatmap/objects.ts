import { Color, V2 } from "../core/utils";

export enum HitObjectFlags {
    Circle = 1 << 0,        // 1
    Slider = 1 << 1,        // 2
    NewCombo = 1 << 2,      // 4
    Spinner = 1 << 3,       // 8
    SkipColor1 = 1 << 4,    // 16
    SkipColor2 = 1 << 5,    // 32
    SkipColor3 = 1 << 6,    // 64
    Hold = 1 << 7,          // 128
    Color = SkipColor1 | SkipColor2 | SkipColor3
}

export enum Hitsounds {
    Whistle = 1 << 1,   // 2 // 0010
    Finish = 1 << 2,    // 4 // 0100
    Clap = 1 << 3,      // 8 // 1000
}

export class HitObject {
    startTime: number;
    position: V2;
    color: Color;
    comboIndex: number;
    slider_nodes: Array<SliderNode> | undefined

    private hitsound: number;
    private type: number;

    constructor(startTime: number, position: V2, color: Color, hitsound: number, type: number, comboIndex: number) {
        this.startTime = startTime;
        this.position = position;
        this.color = color;
        this.hitsound = hitsound;
        this.type = type;
        this.comboIndex = comboIndex;
    }

    public hasHitsound(value: Hitsounds): boolean {
        if((this.hitsound & value) != 0) {
            return true;
        } else return false;        
    }

    public hasFlag(value: HitObjectFlags): boolean {
        if((this.hitsound & value) != 0) {
            return true;
        } else return false;   
    }
}

type SliderNode = {
    x: number,
    y: number,
    t: number,
}

