import { randomInt } from "crypto";
import fs from "fs";
import Component from "./component";

class Generator {

    success_emoji: string[] = ["🌳", "🌿", "🍀", "🎍", "🍃", "🌴"];
    layers_titles: string[] = [
        "//Storyboard Layer 0 (Background)\n",
        "//Storyboard Layer 1 (Fail)\n",
        "//Storyboard Layer 2 (Pass)\n",
        "//Storyboard Layer 3 (Foreground)\n",
        "//Storyboard Layer 4 (Overlay)\n",
    ];

    public MakeStoryboard(components: Component[], beatmap_path: string, start_time: any) {
        this.BuildComponents(components, (component_contents) => {
            fs.truncateSync("storyboard.osb", 0);
            fs.appendFileSync("storyboard.osb", "[Events]\n");
            fs.appendFileSync("storyboard.osb", "//Background and Video events\n");
            component_contents.forEach(component_content => {
                component_content.forEach((layer, key) => {
                    fs.appendFileSync("storyboard.osb", this.layers_titles[key]);
                    fs.appendFileSync("storyboard.osb", layer);
                });
            });
            fs.appendFileSync("storyboard.osb", "//Storyboard Sound Samples\n");
            let end_time:any = new Date();
            console.log(`\nStoryboard successfully generated! [${end_time - start_time}ms] ${this.success_emoji[randomInt(6)]}`);
        });
    }

    private async BuildComponents(components: Component[], callback: (component_contents: string[][]) => void) {
        let contents: Array<string[]> = new Array<string[]>();
        components.forEach((component) => {
            component.Generate();
            component.Build().then(content => {
                component.Success("Component successfully built!");
                contents.push(content);
                if (contents.length == components.length) {
                    callback(contents);
                }
            });
        });
    }
}

export default new Generator();
