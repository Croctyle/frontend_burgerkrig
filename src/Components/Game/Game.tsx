import * as React from "react";
import { inject, observer } from "mobx-react"
import Unity, { UnityContent } from "react-unity-webgl";


@inject("api")
@observer
export class Game extends React.Component {

  constructor(props) {
    super(props);

    // include this later
    /*
    this.unityContent = new UnityContent(
      "MyGame/Build.json",
      "MyGame/UnityLoader.js"
    );
    */
     
  }

  // replace div with id unity with:
  /*
    <Unity unityContent={unityContent} />;
  */
  public render() {
    return <div>

    </div>;
  }
}
