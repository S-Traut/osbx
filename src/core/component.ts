import Plugin from "./plugin";
import Sprite from "./sprite";
import Configs, { getConfig } from "./configs";

export default abstract class Component {

    sprites: Sprite[] = [];
    component_plugins = new Map<string, Plugin>();
    layers_id = new Map<string, number>();
    config: Configs;

    constructor() {
        this.config = getConfig();
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

    private RegisterPlugins() {
        //Get all plugins from config file
        if(this.config.plugins_info && this.config.path_info) {
            for(const plugin of this.config.plugins_info) {
                const element = require(`${this.config.path_info.project_path}/plugins/${plugin.name}`);
                this.component_plugins.set(plugin.name, element.default.Initialize(this));       
            }
        }
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
