# osbx

Component &amp; Plugin based storyboard generator built on top of @dotosb library

## Requirements

- NodeJS: latest
- ts-node (npm i -g ts-node)

## Getting started

To create a new storyboard project, first create a new directory on your computer.
Then you can run the following commands:

```bash
npm init -y
npm install osbx
```

create a new file named `osbx.config.json`

```json
{
  "beatmap_path": "path_to_the_beatmap_folder",
  "beatmap_name": "name_of_the_beatmap"
}
```

Finally, create a main.ts file with a basic code example:

```ts
import { Component, osbx, Plugin } from "osbx";

class ExamplePlugin extends Plugin {
  public hello_world(): void {
    const sprite = this.createSprite("sb/p.png");
    sprite.fade([0, 10000], [1, 1]);
  }
}

class MainComponent extends Component {
  private example_plugin = this.getPlugin(ExamplePlugin);

  init() {
    this.example_plugin.hello_world();
  }
}

osbx.create(MainComponent);
```

You can run your project with nodemon: `nodemon -q main.ts` or with ts-node `ts-node main.ts`
