const { newEvent, newParam } = require('./event.js');
const { IntervalMap } = require('./imap.js');
const { ease } = require('./easing.js');

class Sprite {

  events = [];
  path;
  origin;
  layer;
  x;
  y;

  constructor(path, options) {
    this.layer = options?.layer ?? "Background";
    this.origin = options?.origin ?? "Centre";
    this.path = path;
    this.x = options?.x ?? 320;
    this.y = options?.y ?? 240;
    this.imap = new IntervalMap();
  }

  add(type, times, values, easing = 0) {
    const event = newEvent(type, times, values, easing);
    if(Array.isArray(times)) this.imap.add(event);
    this.events.push(event);
  }

  /**
  * Query sprite parameters at a given time
  */
  getAt(type, time) {
    const length = this.events.length; 
    const events = this.imap.query(time);
    for(const event of events) {
      if(event.type != type) continue;
      const vcount = event.start_values.length;
      const differences = [];
      const p = Math.abs((time - event.start) / (event.start - event.end));
      const easing = ease(event.easing, p);
      for(let i = 0; i < vcount; i++) {
        const diff = Math.abs(event.start_values[i] - event.end_values[i]);
        differences.push(event.start_values[i] + (diff * easing));  
      }
      return differences.length == 1 ? differences[0] : differences;
    }
  }

  param(start, end, type) {
    const param = newParam(start, end , type);
    this.events.push(param);
  }

  createLoop(start, loop_count, events) {

    let stringified = ` L,${start},${loop_count}`;
    for(let i = 0; i < events.length; i++) {
      stringified += `\n ${events[i].stringified}`;
    }
    
    const event = {
      type: 'L',
      start: start,
      loop_count: loop_count,
      events: events,
      stringified: stringified
    };

    this.events.push(event);
  }

  toString() {
    let sprite = `Sprite,${this.layer},${this.origin},"${this.path}",${this.x},${this.y}\n`;
    for (let i = 0; i < this.events.length; i++) {
      sprite += `${this.events[i].stringified}\n`;
    }
    return sprite;
  }
}

module.exports = { Sprite };