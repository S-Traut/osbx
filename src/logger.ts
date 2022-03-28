import { trace } from "console";
import Component from "./component";

export default class Logger {
  
  public component: Component;

  constructor(component: Component) {
    component.logger = this;
    this.component = component;
  }

  error(message: string) {
    console.error(`\x1b[41m\x1b[30m  TRACE  \x1b[0m ${this.component.getTrace()}`);
    console.error(`\x1b[41m\x1b[30m  ERROR  \x1b[0m ${message}`);
  }

  success(message: string) {
    console.log(`\x1b[40m\x1b[32m SUCCESS \x1b[0m ${message}`);
  }

  log(message: string) {
    console.log(`\x1b[40m\x1b[37m   LOG   \x1b[0m ${message}`);
  }

  warning(message: string) {
    console.log(`\x1b[40m\x1b[33m WARNING \x1b[0m ${message}`);
  }

  componentTrace() {
    console.log(`\x1b[40m\x1b[37m  TRACE  \x1b[0m ${this.component.getTrace()}`);
  }
}