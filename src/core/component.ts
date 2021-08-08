import Plugin from "./plugin";
import Sprite from "./sprite";
import Configs, { getConfig } from "./configs";
import Logger from "./logger";

export default abstract class Component {

    sprites: Sprite[] = [];
    component_plugins = Array<Plugin>();
    layers_id = new Map<string, number>();
    project_config: Configs;
    logger: Logger;

    constructor() {
        this.logger = new Logger(this.constructor.name);
        this.project_config = getConfig();
        this.RegisterPlugins();
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

    public GetPlugin<T extends Plugin>(pluginClass: {new (): T}): T {
        return this.component_plugins.find(e => e instanceof pluginClass) as T;
    }

    private RegisterPlugins() {
        //Get all plugins from config file
        if(this.project_config.plugins_info && this.project_config.path_info) {
            for(const plugin of this.project_config.plugins_info) {
                const element = require(`${this.project_config.path_info.project_path}/plugins/${plugin.name}`);
                this.component_plugins.push(element.default.Initialize(this, new Logger(`${this.constructor.name} : ${plugin.name}`), this.project_config));       
            }
        }
    }

    
}

class Factory {
    create<T>(type: (new () => T)): T {
        return new type();
    }
}