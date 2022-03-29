import { Storyboard } from "dotosb";
import Component from "./component";
import { Configuration } from "./project";
import fs from "fs";
import { exit } from "process";
import Logger from "./logger";

const base_configuration = {
  beatmap_path: "./beatmap"
}

function getProjectConfiguration(logger: Logger): Configuration {
  const configuration_file = `${process.cwd()}/osbx.config.json`;
  if(!fs.existsSync(configuration_file)) {
    logger.error("Configuration file not found in the project folder (osbx.config.json)");
    exit();
  }
  const JSON = require(configuration_file);

  return {
    beatmap_path: JSON.beatmap_path
  };
}

export default class osbx {
  
  static create(main_component: typeof Component): void {
    console.clear();
    console.log('\x1b[40m\x1b[36m', ' BUILD ', '\x1b[0m');  //cyan
    const storyboard = new Storyboard();
    const main = new main_component(storyboard);
    const logger = new Logger(main);
    const configuration = getProjectConfiguration(logger);
    main.setProject(configuration);
    main.generate();
    storyboard.write(`${configuration.beatmap_path}/out.osb`, true);
  }


}