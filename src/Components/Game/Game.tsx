import * as React from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import { Button } from "react-bootstrap";
import { ActionLog } from "./ActionLog";
import { ApiContext } from "../..";

export function Game() {
  const api = React.useContext(ApiContext);
  const unityContent = new UnityContent(
    "BUR/Build/BUR.json",
    "BUR/Build/UnityLoader.js"
  );

  unityContent.on("sendResultJsonString", data => {
    alert("OKKKK")
    console.log(data);
  })

  const test = () => {
    api.request("gamedata.addNew", {
      actions: "TSET",
      gameStart: new Date().toISOString(),
      gameEnd: new Date().toISOString(),
      points: 5000,
      shots: 31233123,
      mouseMoved: 3000
    })
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ flexGrow: 0.5, background: "green", height: "1200px" }}
      ><Button onClick={test}>TESTDATA</Button></div>
      <div style={{ flexGrow: 2, background: "ghostwite", height: "600px", width: "960px" }}>
        <Unity unityContent={unityContent} height="600px" width="960px"/>
        <div style={{width: "100%", height: "100%", background: "black"}}><ActionLog/></div>
      </div>
    </div>
  );
}