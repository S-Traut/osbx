export default class Configs {
    
    private static instance: Configs;

    public start_time!: any;
    public path_info!: config_path;
    public plugins_info!: Array<config_plugin>;


    public static getInstance(): Configs {
        if (!Configs.instance) {
            Configs.instance = new Configs();
        }
        return Configs.instance;
    }

    private constructor() { }
}

export function getConfig() {
    return Configs.getInstance();
}

type config_path = {
    beatmap_path: string;
    project_path: string;
}

type config_plugin = {
    name: string,
    version: string
}