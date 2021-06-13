import { randomInt } from "crypto";
import fs from "fs";
import Component from "./component";

class Generator {

    success_emoji: string[] = ["🌳", "🌿", "🍀", "🎍", "🍃", "🌴"];
    layers_titles: string[] = [
        "//Storyboard Layer 0 (Background)\n",
        "//Storyboard Layer 1 (Foreground)\n",
    ];

    public MakeStoryboard(components: Component[], beatmap_path: string) {
        this.BuildComponents(components, (component_contents) => {
            fs.truncateSync("storyboard.osb", 0);
            component_contents.forEach(component => {
                component.forEach((layer, key) => {
                    fs.appendFileSync("storyboard.osb", this.layers_titles[key]);
                    fs.appendFileSync("storyboard.osb", layer);
                });
            });
        });
        console.log(`\nStoryboard successfully generated! ${this.success_emoji[randomInt(6)]}`);
    }

    private async BuildComponents(components: Component[], callback: (component_contents: string[][]) => void) {
        let contents: Array<string[]> = new Array<string[]>();
        components.forEach((component) => {
            component.Generate();
            component.Build().then(content => {
                contents.push(content);
                if (contents.length == components.length) {
                    callback(contents);
                }
            });
        });
    }
}

export default new Generator();
