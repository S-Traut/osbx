import { Layers, Options, Origins } from "./utils";
import Sprite from "./sprite";
import Component from "./component";

export default abstract class Plugin {

    private component: Component | undefined;

    /**
    * Creates a new sprite object, which can be used to add sprites in your storyboard.
    * @param path Path of the sprites relative to you osu! beatmap folder E.G: sb/sprite.png.
    * @param layer (optional) The OSB Layer your sprite will be generated in.
    * @param origin (optional) The origin position of the sprite.
    * @param position (optional) The base position of the sprite in your screen.
    * @return Sprite
    */
    public CreateSprite(path: string, layer = Layers.Background, origin = Origins.Centre, position = Options.SCREEN_CENTER): Sprite {
        let sprite = new Sprite(path, layer, origin, position);
        this.component?.sprites.push(sprite);
        return sprite;
    }

    public Initialize(component: Component): Plugin {
        this.component = component;
        return this;
    }
}
