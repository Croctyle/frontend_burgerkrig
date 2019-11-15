import * as React from "react";
import { inject, observer } from "mobx-react";
import Unity, { UnityContent } from "react-unity-webgl";
import { Row, Col, Button } from "react-bootstrap";
import { ActionLog } from "./ActionLog";
import { Api } from "../../Api";
import autobind from "autobind-decorator";


interface IGameProps {
  // injected
  api?: Api;
}
@inject("api")
@observer
export class Game extends React.Component<IGameProps> {
  private unityContent: UnityContent;
  constructor(props) {
    super(props);

    // include this later
    this.unityContent = new UnityContent(
      "BUR/Build/BUR.json",
      "BUR/Build/UnityLoader.js"
    );
  }

  @autobind
  private test() {
    /*
    id: number;
    actions: string;
    gameStart: string;
    gameEnd: string;
    points: number;
    shots: number;
    mouseMoved: number;
    */
   this.props.api.request("gamedata.addNew", {
     actions: "TSET",
     gameStart: new Date().toISOString(),
     gameEnd: new Date().toISOString(),
     points: 5000,
     shots: 31233123,
     mouseMoved: 3000
   })
  }
  // replace div with id unity with:
  /*
    <Unity unityContent={this.unityContent} height="800px"/>
  */
  public render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{ flexGrow: 0.5, background: "green", height: "1200px" }}
        ><Button onClick={this.test}>TESTDATA</Button></div>
        <div style={{ flexGrow: 2, background: "ghostwite", height: "600px", width: "960px" }}>
          <Unity unityContent={this.unityContent} height="600px" width="960px"/>
          <div style={{width: "100%", height: "100%", background: "black"}}><ActionLog/></div>
        </div>
      </div>
    );
  }
}
