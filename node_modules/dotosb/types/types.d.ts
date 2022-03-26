declare module "dotosb" {

  class Storyboard {
    private layers: Map<string, Array<Sprite>>;

    createSprite(path: string, options?: Partial<SpriteOptions>): Sprite;
    write(file_path: string): void;
    toString(): string;
  }

  function fromFile(file_path: string): Storyboard;

    class Sprite {
    constructor(path: string, options?: Partial<SpriteOptions>);

    add(
      type: string,
      times: Array<number>,
      values: Array<number>,
      easing?: number
    ): void;
    param(start: number, end: number, type: string): void;
    createLoop(
      start: number,
      loop_count: number,
      events: Array<OsbEvent | OsbParameter>
    ): void;
    toString(): string;
  }

  type SpriteOptions = {
    layer: String;
    origin: String;
    x: Number;
    y: Number;
  };
  
    type OsbEvent = {
    type: string;
    easing: number;
    start: number;
    end: number;
    start_values: Array<number> | number;
    end_values: Array<number> | number;
    stringified: string;
  };

  type OsbParameter = {
    type: string;
    start: number;
    end: number;
    stringified: string;
  };

  function newEvent(
    type: string,
    times: Array<number>,
    values: Array<number>,
    easing: number
  ): OsbEvent;
  function newParam(start: number, end: number, type: string): OsbParameter;
}
