import * as React from "react";

interface ISpinnerProps {
    sm?: boolean;
    freeze?: boolean;
}

export function Spinner(props: ISpinnerProps){
        return <img className={props.freeze ? "" : "spinner"} style={{width: props.sm ? "32px" : ""}} src={"logo.png"}/>
}