import * as React from "react";

interface ICheeseWrapperProps {
  style?: React.CSSProperties;
  className?: string;
  showcheese?: boolean;
}

export const CheeseWrapper: React.FC<ICheeseWrapperProps> = props => {
  let classNames = [props.className, props.showcheese ? "mask" : ""];
  console.log(props.showcheese);
  let style: React.CSSProperties = {
    background: "#ffc71e",
    borderRadius: "30%",
    border: "11px solid rgb(255,171,19)",
    color: "#342211",
    fontFamily: "Bangers"
  };

  style = { ...style, ...(props.style || {}) };

  return (
    <div className={classNames.join(" ")} style={style}>
      {props.children}
    </div>
  );
};
