import { Easing, Event } from "dotosb";
import osbx from "./src/app";
import Component from "./src/component";
import Plugin from "./src/plugin";

class MyPlugin extends Plugin {

  generateBackground() {
    const sprite = this.createSprite('bg.jpg');
    sprite.fade([0, 1000], [0, 1], Easing.ExpoOut);
  }

}

class MyComponent extends Component {

  override init() {
    const my_plugin = this.getPlugin(MyPlugin);
    my_plugin.generateBackground();
  }
}

class Main extends Component {
  
  override init() {
    
    this.addComponent(MyComponent);
    
  }
}

osbx.create(Main);
