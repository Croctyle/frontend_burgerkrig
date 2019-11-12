import * as React from "react";
import { inject, observer } from "mobx-react"
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
      "Build/bulletHellBuild.json",
      "Build/UnityLoader.js"
    );
     
  }

  // replace div with id unity with:
  /*
    <Unity unityContent={this.unityContent} height="800px"/>
  */
  public render() {
    return <div style={{display: "flex"}}>
      <div style={{flexGrow: 0.5, background: "green", height: "800px"}}>
        
      </div>
      <div style={{flexGrow: 2, background: "ghostwite"}}>
        
      </div>
      <div style={{flexGrow: 0.5, background: "green"}}>3</div>
    </div>;
  }
}
