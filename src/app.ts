import { Storyboard } from "dotosb";
import Component from "./component";

const base_configuration = {
  beatmap_path: "./beatmap"
}

export default class osbx {
  static create(main_component: typeof Component): void {
    console.clear();
    console.log('\x1b[40m', 'OSBX BUILD', '\x1b[0m');  //cyan
    const storyboard = new Storyboard();
    const main = new main_component(storyboard);
    main.setProject(base_configuration);
    main.generate();
    storyboard.write('out.osb');
  }
}