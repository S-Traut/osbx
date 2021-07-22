import { Color } from "../core/utils";
import { HitObject } from "./objects";
import { ParseBookmarks, ParseColors, ParseMetadata } from "./parser";

export default class Beatmap {
    difficulty!: Difficulty;
    timing_points: Array<TimingPoint> = [];
    hitobjects: Array<HitObject> = [];
    file: string;
    colors: Array<Color> = [
        {r: 255, g: 192, b: 0},
        {r: 0, g: 202, b: 0},
        {r: 18, g: 124, b: 255},
        {r: 242, g: 24, b: 57},
    ]

    constructor(file: string) {
        this.file = file;
        this.colors = ParseColors(this.file) ?? this.colors;
    }

    public getMetadata(): Metadata {
        return ParseMetadata(this.file);
    }

    public getBookmarks(): Array<number> | null {
        return ParseBookmarks(this.file);
    }
}

class TimingPoint {

}

export interface Metadata {
    title: string;
    artist: string;
    creator: string;
    difficulty: string;
}

export interface Difficulty {
    drain: number;
    circle_size: number;
    overall_difficulty: number;
    approach_rate: number;
    slider_multiplier: number;
    slider_tick_rate: number;
}
