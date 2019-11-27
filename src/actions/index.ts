export * from "./Highscore";
export interface IAction<T = any, S = any> {
    type: T
    value: S
}