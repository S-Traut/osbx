import Beatmap, { Metadata } from "./beatmap";
import fs from "fs";
import { HitObject, HitObjectFlags } from "./objects";
import { Color } from "../core/utils";

export function ParseBeatmap(filePath: string): Beatmap {

    const file = fs.readFileSync(filePath, "utf-8");
    let beatmap = new Beatmap(file);

    // Options: [0] Hitobjects [1] //
    const separation = file.split("[HitObjects]");
    const lines = separation[1].split('\n');
    
    let comboIndex = 0;
    let colorIncrement = 0;
    let colorIndex = 0;
    let previousObject: HitObject | undefined;

    let objects: Array<HitObject> = [];
    for(let i = 0; i < lines.length; i++) {
        const raw = lines[i].split(",");
        if(raw.length < 4) continue;
        const values = {
            position: { x: parseInt(raw[0]) + 64, y: parseInt(raw[1]) + 56 },
            startTime: parseInt(raw[2]),
            type: parseInt(raw[3]),
            hitsound: parseInt(raw[4])
        }

        if((values.type & HitObjectFlags.NewCombo) != 0 || previousObject == undefined || previousObject.hasFlag(HitObjectFlags.Spinner)) {
            colorIncrement = (values.type >> 4) & 7;
            if ((values.type & HitObjectFlags.Spinner) == 0)
                colorIncrement++;
            colorIndex = (colorIndex + colorIncrement) % beatmap.colors.length;
            comboIndex = 0;
        }
        comboIndex++;

        const object = new HitObject(
            values.startTime,
            values.position,
            beatmap.colors[colorIndex],
            values.hitsound,
            values.type,
            comboIndex
        );
        previousObject = object;
        objects.push(object);
    }
    beatmap.hitobjects = objects;
    return beatmap;
}

export function ParseBookmarks(file: string): Array<number> | null {
    const bookmarks = file.match(/(?<=Bookmarks: )(.*)/);
    if (bookmarks) {
        bookmarks[0].split(",").map(i => {
            return parseInt(i, 10);
        });
    }
    return null;
}

export function ParseMetadata(file: string): Metadata {
    const title = file.match(/(?<=Title:)(.*)/);
    const artist = file.match(/(?<=Artist:)(.*)/);
    const creator = file.match(/(?<=Creator:)(.*)/);
    const difficulty = file.match(/(?<=Creator:)(.*)/);
    return {
        title: title![0],
        artist: artist![0],
        creator: creator![0],
        difficulty: difficulty![0]
    }
}

export function ParseColors(file: string): Array<Color> | undefined {
    if(file.match(/\[Colours\]/)) {
        let colors: Array<Color> = [];
        const matches = file.match(/(?<=Combo[0-9]+ : )(.*)/g);
        if(matches) {
            for(let i = 0; i < matches.length; i++) {
                const raw = matches[i].split(',');
                const color: Color = { 
                    r: parseInt(raw[0]), 
                    g: parseInt(raw[1]), 
                    b: parseInt(raw[2]) 
                };
                colors.push(color);
            }
            return colors;
        }
    }
    return undefined;
}