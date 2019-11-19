import * as React from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import { ActionLog } from "./ActionLog";
import { ApiContext } from "../..";
import { CheeseWrapper } from "../CheeseWrapper";
import { IUser } from "../../Api";

export function Game() {
  const api = React.useContext(ApiContext);
  let [highscores, setHighscores] = React.useState<any[]>([]);
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

  React.useEffect(() => {
    api.request("user.getHighscoreList",{})
    .then(e => {
      setHighscores(e);
    })
  }, [])




  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ flexGrow: 0.5, background: "green", height: "1200px" }}
      >
        <CheeseWrapper style={{margin: "5px 8px"}}>
          {highscores.map((e, index) => {
            return <div>
                {index+1}. {e.user_loginName} ({e.gameinfo_highscore})
              </div>
          })}
        </CheeseWrapper>
      </div>
      <div style={{ flexGrow: 2, background: "ghostwite", height: "600px", width: "960px" }}>
        <Unity unityContent={unityContent} height="600px" width="960px"/>
        <div style={{width: "100%", height: "100%", background: "black"}}><ActionLog onNewMessage={() => {
          api.request("user.getHighscoreList", {}).then(e => {
            setHighscores(e)
          })
        }}/></div>
      </div>
    </div>
  );
}