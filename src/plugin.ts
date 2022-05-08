import { SpriteOptions, Storyboard, Sprite as dotosb_sprite } from "dotosb";
import { HitObject, Position } from "dotosu";
import Logger from "./logger";
import Project from "./project";
import Sprite, { Layers, Origins } from "./sprite";

export default class Plugin {
  
  public logger: Logger;
  public storyboard: Storyboard;
  public project: Project;

  constructor(storyboard: Storyboard, project: Project, logger: Logger) {
    this.storyboard = storyboard;
    this.project = project;
    this.logger = logger;
  }

  public createSprite(path: string, layer?: Layers, origin?: Origins,  position?: Position): Sprite {

    if (!position) {
      position = {
        x: 320,
        y: 240,
      }
    }

    const options: SpriteOptions = {
      x: position.x,
      y: position.y,
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