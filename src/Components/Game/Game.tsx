import * as React from "react";
import { inject, observer } from "mobx-react";
import Unity, { UnityContent } from "react-unity-webgl";
import { Row, Col } from "react-bootstrap";

@inject("api")
@observer
export class Game extends React.Component {
  private unityContent: UnityContent;
  constructor(props) {
    super(props);

    // include this later
    this.unityContent = new UnityContent(
      "BUR/Build/BUR.json",
      "BUR/Build/UnityLoader.js"
    );
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
        ></div>
        <div style={{ flexGrow: 2, background: "ghostwite", height: "600px", width: "960px" }}>
          <Unity unityContent={this.unityContent} height="600px" width="960px"/>
          <div style={{width: "100%", height: "100%", background: "hotpink"}}>Hello</div>
        </div>
        <div style={{ flexGrow: 0.5, background: "green" }}>3</div>
      </div>
    );
  }
}
