import { Hitobject } from "./objects";
import { ParseBookmarks, ParseMetadata } from "./parser";

export default class Beatmap {
    difficulty!: Difficulty;
    timing_points!: Array<TimingPoint>;
    hitobjects!: Array<Hitobject>;
    file: string;

    constructor(file: string) {
        this.file = file;
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
