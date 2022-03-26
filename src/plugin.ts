import { SpriteOptions, Storyboard, Sprite as dotosb_sprite } from "dotosb";
import Sprite from "./sprite";

export default class Plugin {

  public storyboard: Storyboard;
  
  public createSprite(path: string, options?: SpriteOptions): Sprite {
    const sprite = new Sprite(path, options);
    this.storyboard.addSprite(sprite);
    return sprite;
  }

  constructor(storyboard: Storyboard) {
    this.storyboard = storyboard;
  }

}