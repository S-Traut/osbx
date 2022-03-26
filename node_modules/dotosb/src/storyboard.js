const { Sprite } = require('./sprite.js');
const { Animation } = require('./animation.js');
const fs = require('fs');
const { newEvent, newParam } = require("./event.js");

class Storyboard {

  layers = new Map();

  constructor() {
    const layers = new Map();
    layers.set('Background', []);
    layers.set('Fail', []);
    layers.set('Pass', []);
    layers.set('Foreground', []);
    layers.set('Overlay', []);

    this.layers = layers;
  }

  createSprite(path, options) {
    const sprite = new Sprite(path, options);
    const storyboard_layer = this.layers.get(options?.layer ?? "Background");    
    storyboard_layer.push(sprite);
    
    return sprite;
  }

  createAnimation(path, frame_count, frame_delay, options) {
    const animation = new Animation(path, frame_count, frame_delay, options);
    const storyboard_layer = this.layers.get(options?.layer ?? "Background");
    storyboard_layer.push(animation);

    return animation;
  }

  addSprite(sprite) {
    const storyboard_layer = this.layers.get(sprite.layer);
    storyboard_layer.push(sprite);
  }

  toString() {
    let storyboard = '[Events]\n//Background and Video events\n';
    let index = 0;
    for(const [name, sprites] of this.layers) {
      storyboard += `//Storyboard Layer ${index} (${name})\n`;
      for(let i = 0; i < sprites.length; i++) {
        storyboard += sprites[i].toString();
      }
      index++;
    }
    return storyboard;
  }

  write(file_path) {
    fs.writeFile(file_path, this.toString(), e => {
      if(e) throw e;
      console.log('Successfuly generated storyboard!');
    });
  }
}

function fromFile(file_path) {
  let data = fs.readFileSync(file_path, 'utf8');
  data = data.replace(/(\r\n|\r|\n)/g, '\n');
  data = data.replace('\\', '/');
  return fromString(data);
}

function fromString(data) {
  let layers = data.split('//Storyboard Layer ');
  layers.shift();

  const storyboard = new Storyboard();
  
  for (const layer of layers) {
    const sprites = layer.match(/(?=Sprite)(.*)(\n [A-Z](.*)|\n  [A-Z](.*))+/g);
    if (!sprites) continue;

    for(let i = 0; i < sprites.length; i++) {
      const spritelines = sprites[i].split('\n');
      const values = spritelines[0].split(',');
      spritelines.shift();

      const sprite = storyboard.createSprite(values[3].replace(/^"(.*)"$/, '$1'), {
        layer: values[1],
        origin: values[2],
        x: values[4],
        y: values[5],
      });

      let capture = [];
      let loop;
      let capturing = false;
      for(let e = 0; e < spritelines.length; e++) {
        const event_values = spritelines[e].split(',');
        const type = event_values[0].replace(/ /g,'');

        if(capturing && spritelines[e].split(',')[0][1] != ' ') {
          capturing = false;
          sprite.createLoop(loop.start, loop.count, capture);
          capture = [];
        }

        if(type == 'L') {
          capturing = true;
          loop = {
            start: parseInt(event_values[1]),
            count: parseInt(event_values[2])
          }
          continue;
        }

        const isDynamic = event_values[3] == '' ? false : true;
        const event_action_values = event_values.slice(4).map(e => parseFloat(e));

        let start_values = event_action_values;
        let end_values = null;

        if(isDynamic) {
          const half = Math.ceil(event_action_values.length / 2);
          start_values = event_action_values.slice(0, half);
          end_values = event_action_values.slice(-half);
        }

        const times_built = isDynamic ? [ parseInt(event_values[2]), parseInt(event_values[3])] : parseInt(event_values[2]);
        const values_built = isDynamic ? start_values.concat(end_values) : start_values;

        if(capturing) {
          if (type == 'P') {
            capture.push(newParam(parseInt(event_values[2]), parseInt(event_values[3]), event_values[4]))
          } else {
            capture.push(newEvent(type, times_built, values_built, event_values[1])); 
          }
        } else {
          if (type == 'P') {
            sprite.param(parseInt(event_values[2]), parseInt(event_values[3]), event_values[4]);
          } else {
            sprite.add(type, times_built, values_built, event_values[1]);    
          }
        }
      }  
    }
  }

  return storyboard;
}

module.exports = { Storyboard, fromFile, fromString };