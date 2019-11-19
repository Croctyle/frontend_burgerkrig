import * as React from "react";

interface ICheeseWrapperProps {
  style?: React.CSSProperties;
}

export class CheeseWrapper extends React.Component<ICheeseWrapperProps> {
  public render() {
    let style: React.CSSProperties = {
      background: "#ffc71e",
      borderRadius: "30%",
      border: "11px solid rgb(255,171,19)",
      color: "lightyellow",
      fontFamily: "Bangers"
    };

    style = { ...style, ...(this.props.style || {}) };

    return <div style={style}>{this.props.children}</div>;
  }
}

/*
<CheeseWrapper>

</CheeseWeapper>
*/
