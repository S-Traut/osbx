const { Sprite } = require('./sprite.js');

class Animation extends Sprite {

  frame_count;
  frame_delay;
  loop_type;

  constructor(path, frame_count, frame_delay, options) {
    super();
    this.frame_count = frame_count;
    this.frame_delay = frame_delay;
    this.layer = options?.layer ?? "Background";
    this.origin = options?.origin ?? "Centre";
    this.loop_type = options?.loop_type ?? "LoopForever";
    this.path = path;
    this.x = options?.x ?? 320;
    this.y = options?.y ?? 240;
  }

   toString() {
    let sprite = `Animation,${this.layer},${this.origin},"${this.path}",${this.x},${this.y},${this.frame_count},${this.frame_delay},${this.loop_type}\n`;
    for (let i = 0; i < this.events.length; i++) {
      sprite += `${this.events[i].stringified}\n`;
    }
    return sprite;
  }
}

module.exports = { Animation };