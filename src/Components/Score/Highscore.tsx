import React, { useEffect, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { CheeseWrapper } from "../CheeseWrapper";

export function Highscore() {

    const list = useSelector(state => state.highscore)
    return <CheeseWrapper style={{margin: "5px 8px", padding: "20px"}}>
        Highscores
        {list.map((e, index) => {
        return <div>
            {index+1}. {e.user_loginName} ({e.gameinfo_highscore})
            </div>
        })}
    </CheeseWrapper>


}