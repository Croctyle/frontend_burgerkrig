import { IAction } from ".";
import { api } from "..";

export type ACTION_HIGHSCORE = "SET" | "UPDATE";

export interface IActionHigscore extends IAction<ACTION_HIGHSCORE, any> {}

export const setHighscore = (scoreArray) => {
    return {
        type: "SET",
        value: scoreArray
    }
}

export const updateHighscore = async () => {
    return {
        type: "UPDATE",
        value: (await api.request("user.getHighscoreList",{}))
    }
}