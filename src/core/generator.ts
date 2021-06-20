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
            const file_path = this.GetFileName(beatmap_path);
            fs.truncateSync(file_path, 0);
            fs.appendFileSync(file_path, "[Events]\n");
            fs.appendFileSync(file_path, "//Background and Video events\n");
            component_contents.forEach(component_content => {
                component_content.forEach((layer, key) => {
                    fs.appendFileSync(file_path, this.layers_titles[key]);
                    fs.appendFileSync(file_path, layer);
                });
            });
            fs.appendFileSync(file_path, "//Storyboard Sound Samples\n");
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

    private GetFileName(beatmap_path: string): string {
        const files = fs.readdirSync(beatmap_path);
        for (let i = 0; i < files.length; i++) {
            if (/.osu$/?.test(files[i])) {
                const filename = files[i].replace(/\[[A-Z 'a-z]+\].osu$/, "").trim();
                const file_path = `${beatmap_path}/${filename}.osb`
                fs.openSync(file_path, "w")
                return file_path;
            }
        }
        throw "ERROR: OSU FILE NOT FOUND IN THE BEATMAP FOLDER"
    }
}

export default new Generator();
