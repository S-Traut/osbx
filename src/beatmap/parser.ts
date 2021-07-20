import Beatmap, { Metadata } from "./beatmap";

export function ParseBeatmap(file: string): Beatmap {
    let beatmap = new Beatmap(file);

    // Options: [0] Hitobjects [1] //
    const separation = file.split("[HitObjects]");
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
