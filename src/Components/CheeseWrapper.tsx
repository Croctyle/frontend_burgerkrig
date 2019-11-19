import * as React from "react";

interface ICheeseWrapperProps {
  style?: React.CSSProperties;
}


export const CheeseWrapper: React.FC<ICheeseWrapperProps> = (props) => {
  let style: React.CSSProperties = {
    background: "#ffc71e",
    borderRadius: "30%",
    border: "11px solid rgb(255,171,19)",
    color: "lightyellow",
    fontFamily: "Bangers"
  };

  style = { ...style, ...(props.style || {}) };

  return <div style={style}>{props.children}</div>;
}
