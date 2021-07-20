import Plugin from "./plugin";
import Sprite from "./sprite";
import fs from "fs";
import Beatmap from "../beatmap/beatmap";
import { ParseBeatmap } from "../beatmap/parser";
import { match } from "assert/strict";

export default abstract class Component {

    sprites: Sprite[] = [];
    component_plugins = new Map<string, Plugin>();
    layers_id = new Map<string, number>();

    constructor(plugins: Plugin[]) {
        this.RegisterPlugins(plugins);
        this.layers_id.set("Background", 0);
        this.layers_id.set("Fail", 1);
        this.layers_id.set("Pass", 2);
        this.layers_id.set("Foreground", 3);
        this.layers_id.set("Overlay", 4);
    }

    public Generate(): void { }

    public async Build(): Promise<string[]> {
        return await this.GenerateSprites();
    }

    private async GenerateSprites(): Promise<string[]> {
        let layers_contents: Array<string> = new Array<string>();
        this.sprites.forEach(sprite => {
            const layer_id = this.layers_id.get(sprite.layer);
            if (layer_id != undefined) {
                if (layers_contents[layer_id] == undefined) layers_contents[layer_id] = "";
                layers_contents[layer_id] += `${sprite.options}\n`;
                sprite.parameters.forEach(parameter => {
                    layers_contents[layer_id] += `${parameter.GetLine()}\n`;
                });

            }
        });
        return layers_contents;
    }

    public GetPlugin(plugin_name: string): Plugin | undefined {
        if (this.component_plugins != null) {
            try {
                let plugin = this.component_plugins.get(plugin_name);
                if (plugin == undefined) throw new Error("Plugin not found exception");
                return plugin;
            } catch (error) {
                this.ErrorLog(`Plugin ${plugin_name} not found!`)
                throw error;
            }
        }
    }

    public GetBeatmap(difficulty: string): Beatmap {
        const package_file = require("../../../../package.json");
        const beatmap_path = package_file.config.beatmap_path;
        const files = fs.readdirSync(beatmap_path);
        for (let i = 0; i < files.length; i++) {
            if (/\.osu$/?.test(files[i])) {
                const difficulty_name = files[i].match(/(?<=\) \[)(.*)(?=].osu)/);
                if (difficulty_name && difficulty_name[0] == difficulty) {
                    return ParseBeatmap(files[i]);
                }
            }
        }
        throw "ERROR: BEATMAP DIFFICULTY NOT FOUND";
    }

    private RegisterPlugins(plugins: Plugin[]) {
        plugins.forEach(plugin => {
            const plugin_name = plugin.constructor.name;
            if (!this.component_plugins.get(plugin_name)) {
                this.component_plugins.set(plugin_name, plugin.Initialize(this));
            } else {
                this.Warn(`Plugin ${plugin_name} already loaded!`);
            };
        });
    }


    public Log(message: string) {
        console.log(`INFO [${this.constructor.name}]: ${message}`);
    }

    public Warn(message: string) {
        console.log("\x1b[33m%s\x1b[0m", `🟠 [${this.constructor.name}]: ${message}`);
    }

    public Success(message: string) {
        console.log("\x1b[32m%s\x1b[0m", `🟢 [${this.constructor.name}]: ${message}`);
    }

    public ErrorLog(message: string) {
        console.log("\x1b[31m%s\x1b[0m", `🔴 [${this.constructor.name}]: ${message}`);
    }
}
