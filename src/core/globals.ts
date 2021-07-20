export default class Globals {
    
    private static instance: Globals;

    public start_time!: Date;
    public config: any;

    public static getInstance(): Globals {
        if (!Globals.instance) {
            Globals.instance = new Globals();
        }
        return Globals.instance;
    }

    private constructor() { }
}