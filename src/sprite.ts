import * as dotosb from "dotosb";

export type Position = {
  x: number,
  y: number,
}

export enum Layers {
  Background = "Background", 
  Fail = "Fail",
  Pass = "Pass",
  Foreground = "Foreground", 
  Overlay = "Overlay",
}

export enum Origins {
  TopLeft = "TopLeft",
  TopCentre = "TopCentre",
  TopRight = "TopRight",
  CentreLeft = "CentreLeft",
  Centre = "Centre",
  CentreRight = "CentreRight",
  BottomLeft = "BottomLeft",
  BottomCentre = "BottomCentre",
  BottomRight = "BottomRight",
}

export default class Sprite extends dotosb.Sprite {

  public fade(times: number[] | number, values: number[] | number): void;
  public fade(times: number[], values: number[], easing: dotosb.Easing): void;
  public fade(times: number | number[], values: number | number[], easing?: dotosb.Easing): void {
    this.add('F', times, values, easing);
  }

  public move(times: number[] | number, values: number[] | number): void;
  public move(times: number[], values: number[], easing: dotosb.Easing): void;
  public move(times: number | number[], values: number | number[], easing?: dotosb.Easing): void {
    this.add('M', times, values, easing);
  }

  public moveX(times: number[] | number, values: number[] | number): void;
  public moveX(times: number[], values: number[], easing: dotosb.Easing): void;
  public moveX(times: number | number[], values: number | number[], easing?: dotosb.Easing): void {
    this.add('MX', times, values, easing);
  }

  public moveY(times: number[] | number, values: number[] | number): void;
  public moveY(times: number[], values: number[], easing: dotosb.Easing): void;
  public moveY(times: number | number[], values: number | number[], easing?: dotosb.Easing): void {
    this.add('MY', times, values, easing);
  }

  public scale(times: number[] | number, values: number[] | number): void;
  public scale(times: number[], values: number[], easing: dotosb.Easing): void;
  public scale(times: number | number[], values: number | number[], easing?: dotosb.Easing): void {
    this.add('S', times, values, easing);
  }

  public vScale(times: number[] | number, values: number[] | number): void;
  public vScale(times: number[], values: number[], easing: dotosb.Easing): void;
  public vScale(times: number | number[], values: number | number[], easing?: dotosb.Easing): void {
    this.add('V', times, values, easing);
  }

  public rotate(times: number[] | number, values: number[] | number): void;
  public rotate(times: number[], values: number[], easing: dotosb.Easing): void;
  public rotate(times: number | number[], values: number | number[], easing?: dotosb.Easing): void {
    this.add('R', times, values, easing);
  }

  public color(times: number[] | number, values: number[] | number): void;
  public color(times: number[], values: number[], easing: dotosb.Easing): void;
  public color(times: number | number[], values: number | number[], easing?: dotosb.Easing): void {
    this.add('C', times, values, easing);
  }

  public additive(start: number, end: number) {
    this.param(start, end, 'A');
  }
}