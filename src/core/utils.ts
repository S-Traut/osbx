export const Options = {
    SCREEN_CENTER: {
        x: 320,
        y: 240
    }
};

export const Origins = {
    Centre: "Centre",
    TopLeft: "TopLeft",
}

export const Layers = {
    Background: "Background",
    Fail: "Fail",
    Pass: "Pass",
    Foreground: "Foreground",
    Overlay: "Overlay"
}

export const Easings = {
    Linear: 0,
    Out: 1,
    In: 2,
    QuadIn: 3,
    QuadOut: 4,
    QuadInOut: 5,
    CubicIn: 6,
    CubicOut: 7,
    CubicInOut: 8,
    QuartIn: 9,
    QuartOut: 10,
    QuartInOut: 11,
    QuintIn: 12,
    QuintOut: 13,
    QuintInOut: 14,
    SineIn: 15,
    SineOut: 16,
    SineInOut: 17,
    ExpoIn: 18,
    ExpoOut: 19,
    ExpoInOut: 20,
    CircIn: 21,
    CircOut: 22,
    CircInOut: 23,
    ElasticIn: 24,
    ElasticOut: 25,
    ElasticHalfOut: 26,
    ElasticQuarterOut: 27,
    ElasticInOut: 28,
    BackIn: 29,
    BackOut: 30,
    BackInOut: 31,
    BounceIn: 32,
    BounceOut: 33,
    BounceInOut: 34
}

/**
* Vector interface, used to store a 2D coordinate position [X,Y].
*/
export interface V2 {
    x: number,
    y: number
}

export interface V3 {
    x: number,
    y: number,
    z: number
}

export interface Color {
    r: number,
    g: number,
    b: number,
}

