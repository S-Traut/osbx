import { Storyboard } from "dotosb";
import { exit } from "process";
import Logger from "./logger";
import Plugin from "./plugin";
import Project, { Configuration } from "./project";

interface ComponentClass<T> {
  new(storyboard: Storyboard, level: number, parent: Component): T;
}

interface PluginClass<T> {
  new(storyboard: Storyboard, project: Project, logger: Logger): T;
}

export default class Component {
  
  private readonly level: number;
  private readonly parent: Component | undefined;
  private readonly components: Component[];
  private readonly plugins: Plugin[];
  private readonly storyboard: Storyboard;
  private readonly layers: Function[];

  private project: Project | undefined;

  public logger!: Logger; 

  constructor(storyboard: Storyboard, level = 0, parent?: Component) {
    this.components = [];
    this.plugins = [];
    this.storyboard = storyboard;
    this.level = level;
  
    if(parent)
      this.parent = parent;
    
    this.layers = [];
  }

  public init(): void {};
  public background(): void {};
  public foreground(): void {};
  public afterload(): void {};

  public generate(): void {
    try {
      this.init();
      this.background();
      for(const layer of this.layers)
        layer();
  
      this.foreground();
      this.logger.success(`Loaded ${this.getName()}`);
      this.afterload();
    } catch(error: any) {
      this.logger.error(error);
      exit();
    }
  }

  public addLayer(callback: Function) {
    this.layers.push(callback);
  }

  public setProject(configuration: Configuration) {
    const project = new Project(configuration);
    this.project = project;
  }

  public getMain(): Component {
    if(!this.parent) 
      return this;
     
    return this.parent.getMain();
  }

  public getProject(): Project {
    const main = this.getMain();
    if(!main.project) {
      console.error("No configuration detected on main");
    }
    
    return main.project!;
  }

  public addComponent<T extends Component>(component: ComponentClass<T>) {
    const instance = new component(this.storyboard, this.level + 1, this);
    if(!this.hasComponent(component)) {
      this.components.push(instance);
      new Logger(instance);
      instance.generate();
    } else {
      this.logger.warning("Component already loaded!");
    }
  }

  private hasComponent<T extends Component>(component: ComponentClass<T>): boolean {
    const parent = this.parent?.hasComponent(component);
    if(!parent) {
      for(const element of this.components) {
        if(element.constructor.name === component.name) 
          return true;
      }
      return false;
    }
    return true;
  }
  
  public getPlugin<T extends Plugin>(plugin: PluginClass<T>): T {
    for(const element of this.plugins) {
      if(element.constructor.name === plugin.name)
        return element as T;
    }

    return new plugin(this.storyboard, this.getProject(), this.logger ?? new Logger(this));
  }

  public linkLogger(logger: Logger) {
    this.logger = logger;
  }

  public getTrace(): string {
    const name = this.getName();
    if(this.parent)
      return `${this.parent?.getTrace()} <- ${name}`;
    else
      return this.getName();

  }

  public getName(): string {
    return this.constructor.name;
  }
}