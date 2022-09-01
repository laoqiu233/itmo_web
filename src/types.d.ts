declare interface Point {
    id: number,
    x: number,
    y: number,
    r: number,
    hit: boolean,
    attempt_time: number,
    process_time: number
    color?: string
}

declare interface PointCreate {
    x: number,
    y: number,
    r: number
}

declare module '*.png' {
    const content: any;
    export default content;
}

declare module '*.svg' {
    const content: any;
    export default content;
}