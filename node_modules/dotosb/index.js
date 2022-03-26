const Storyboard = require('./src/storyboard.js');
const Sprite = require('./src/sprite.js');
const Animation = require('./src/animation');
const Events = require('./src/event.js');
const Easings = require('./src/easing.js');

exports.Storyboard = Storyboard.Storyboard;
exports.Sprite = Sprite.Sprite;
exports.Animation = Animation.Animation;
exports.createEvent = Events.newEvent;
exports.createParam = Events.newParam;
exports.easings = Easings;