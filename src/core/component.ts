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
        for(let i = 0; i < this.component_plugins.length; i++) {
            if(this.component_plugins[i] instanceof pluginClass)
                return this.component_plugins[i] as T;
        }
        
        // If plugin not found, create and register one
        const plugin = new pluginClass;
        plugin.Initialize(this, this.logger, this.project_config);
        this.component_plugins.push(plugin);
        return plugin;
    }
}