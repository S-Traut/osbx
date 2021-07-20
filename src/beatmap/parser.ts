import Beatmap, { Metadata } from "./beatmap";
import fs from "fs";
import { Hitobject } from "./objects";

export function ParseBeatmap(filePath: string): Beatmap {

    const file = fs.readFileSync(filePath, "utf-8");
    let beatmap = new Beatmap(file);

    // Options: [0] Hitobjects [1] //
    const separation = file.split("[HitObjects]");
    const lines = separation[1].split('\n');

    let objects: Array<Hitobject> = [];
    for(let i = 0; i < lines.length; i++) {
        const values = lines[i].split(",");
        if(values.length = 5) {
            let object: Hitobject = {
                startTime: parseInt(values[2]),
                position: { x: parseInt(values[0]), y: parseInt(values[1]) },
                color: {r: 0, g: 0, b: 0} 
            }
            objects.push(object);
        }
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
