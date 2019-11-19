import React, { useEffect, useContext, useState } from "react";
import { ApiContext } from "../..";
import { CheeseWrapper } from "../CheeseWrapper";


export function PointList() {
    const api = useContext(ApiContext);
    let [ list, setList ] = useState([]);

    // on mount
    useEffect(() => {
        api
        .request("user.getPointrank", {})
        .then((e) => {
            setList(e)
        })
    }, []);

    return <CheeseWrapper style={{margin: "5px 8px", padding: "20px"}}>
        Most Points
        {list.map((e, index) => {
        return <div>
            {index+1}. {e.user_loginName} ({e.gameinfo_points})
            </div>
        })}
    </CheeseWrapper>


}