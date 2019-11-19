import * as React from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import { ActionLog } from "./ActionLog";
import { ApiContext } from "../..";
import { CheeseWrapper } from "../CheeseWrapper";
import { IUser } from "../../Api";
import { Highscore } from "../Score/Highscore";
import { PointList } from "../Score/Points";

export function Game() {
  const api = React.useContext(ApiContext);
  let [highscores, setHighscores] = React.useState<any[]>([]);
  let [points, setPoints] = React.useState<any[]>([]);
  const unityContent = new UnityContent(
    "BUR/Build/BUR.json",
    "BUR/Build/UnityLoader.js"
  );

  unityContent.on("sendResultJsonString", data => {
    data = (data as string).replace('""', '","'); // fix broken data
    data = JSON.parse(data);
    for(let a in data) {
      if((data[a] as string).includes(".")) {
        data[a] = Number.parseFloat(data[a]);
      } else {
        data[a] = Number.parseInt(data[a]);
      }
    }
    try {
      api.request("gamedata.addNew", data)
    } catch (err) {
      alert("Sorry, an error occured");
    }
  });





  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ flexGrow: 0.5, height: "1200px" }}
      >
        <Highscore/>
        <PointList/>
      </div>
      <div style={{ flexGrow: 2, background: "ghostwite", height: "600px", width: "960px" }}>
        <Unity unityContent={unityContent} height="600px" width="960px"/>
        <div style={{width: "100%", height: "300px"}}>
          <CheeseWrapper style={{height: "300px"}}>
            <ActionLog onNewMessage={() => {
              api.request("user.getHighscoreList", {}).then(e => {
                setHighscores(e)
              })
            }}/>
          </CheeseWrapper>
        </div>
      </div>
    </div>
  );
}