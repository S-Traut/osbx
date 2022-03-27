import { SpriteOptions, Storyboard, Sprite as dotosb_sprite } from "dotosb";
import { HitObject, Position } from "dotosu";
import Logger from "./logger";
import Project, { Configuration } from "./project";
import Sprite from "./sprite";

export default class Plugin {
  
  public logger: Logger;
  public storyboard: Storyboard;
  public project: Project;

  constructor(storyboard: Storyboard, project: Project) {
    this.storyboard = storyboard;
    this.project = project;
    this.logger = new Logger();
  }

  public createSprite(path: string, layer?: string, origin?: string,  position?: Position): Sprite {
    const options: SpriteOptions = {
      x: position?.x || 320,
      y: position?.y || 240,
      origin: origin || "Centre",
      layer: layer || "Background",
    }
    
    const sprite = new Sprite(path, options);
    this.storyboard.addSprite(sprite);
    return sprite;
  }

  public getHitobjectPosition(hitobject: HitObject): Position {
    return {
      x: hitobject.position.x + 64,
      y: hitobject.position.y + 56,
    }
  }
}