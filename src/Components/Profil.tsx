import * as React from "react";
import { inject } from "mobx-react";
import { Api } from "../Api";
import { CheeseWrapper } from "./CheeseWrapper";

export interface IProfilState {}

export interface IProfilProps {
  id: number;

  // injected
  api?: Api;
}

@inject("api")
export class Profil extends React.Component<IProfilProps, IProfilState> {
  constructor(props: IProfilProps) {
    super(props);
    this.state = {};
  }
 
  public render(): JSX.Element {
    return (
      <div style={{ display: "flex" }}>
        <CheeseWrapper
          style={{
            width: "50%",
            height: "40em",
            margin: "auto",
            marginTop: "10em",
            textAlign: "center"
          }}
        >
          <h2 style={{ fontFamily: "showcard gothic", marginTop: "20px" }}>
            {this.props.api.self.loginName}
          </h2>

          <img
            style={{
              borderRadius: "50%",
              border: "11px solid rgb(255, 171, 19)",
              marginTop: "35px"
            }}
            src={"media/2579311_0.jpg"}
            width="120px"
            height="120px"
          ></img>
          <div
            id="stats"
            style={{ fontFamily: "showcard gothic", marginTop: "50px" }}
          >
            <h3>Burger King</h3>
            <h3>Abgefeuerte Gurken</h3>
            <p>4398520352380</p>
            <h3>Gesamt Spielzeit</h3>
            <p>100min</p>
          </div>
        </CheeseWrapper>
      </div>
    );
  }
}
