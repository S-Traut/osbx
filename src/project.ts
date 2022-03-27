import { Beatmap, loadBeatmap } from "dotosu";
import fs from "fs";
import path from "path";

export type Configuration = {
  beatmap_path: string;
}

interface BeatmapCallback {
  (beatmap: Beatmap): void;
}

export default class Project {
  
  private configuration: Configuration;
  private difficulties: Map<string, Beatmap>;

  constructor(configuration: Configuration) {
    this.configuration = configuration;
    this.difficulties = this.loadDifficulties();
  }

  private loadDifficulties(): Map<string, Beatmap> {
    const difficulties: Map<string, Beatmap> = new Map<string, Beatmap>();
    const dir_info = fs.readdirSync(this.configuration.beatmap_path);
    
    for(const file of dir_info) {
      const osu_file = /.*(\.osu$)/.exec(file)?.input;

      if(osu_file) {
        const file_path = path.join(this.configuration.beatmap_path, osu_file);        
        const name = /(?<=\[)(.*?)(?=\].osu)/.exec(osu_file)![0];
        if(name) {
          const beatmap = loadBeatmap(file_path);
          difficulties.set(name, beatmap);
        }
      }
    }
    return difficulties;
  }



  public getBeatmap(name: string): Beatmap {
    const beatmap = this.difficulties.get(name);
    if(beatmap) {
      return beatmap;
    }
    throw "Beatmap not found!"
  }

  getConfiguration = () => this.configuration;
}