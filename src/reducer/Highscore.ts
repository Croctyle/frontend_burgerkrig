import { IActionHigscore } from "../actions";

const highscore = (state = [], action: IActionHigscore) => {
    switch(action.type) {
        case "SET": return action.value;
        case "UPDATE": return action.value;
        default: return state;
    }
}

export default highscore;