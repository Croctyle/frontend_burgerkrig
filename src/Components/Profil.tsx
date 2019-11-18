import * as React from "react";
import { inject } from "mobx-react";
import { Api } from "../Api";
import { CheeseWrapper } from "./CheeseWrapper";
import { Avatar } from "./Avatar";
import { Spinner } from "./Spinner";

export interface IProfilState {
  user: any;
}

export interface IProfilProps {
  id: number;

  // injected
  api?: Api;
}

@inject("api")
export class Profil extends React.Component<IProfilProps, IProfilState> {
  constructor(props: IProfilProps) {
    super(props);
    this.state = { user: null };
  }

  public async componentDidMount() {
    let user = await this.props.api.request("user.getById", {
      userId: this.props.id || this.props.api.userId
    });
    this.setState({ user });
  }

  public render(): JSX.Element {
    if (!this.state.user) {
      return (
        <CheeseWrapper
          style={{
            width: "50%",
            height: "40em",
            margin: "auto",
            marginTop: "10em",
            textAlign: "center"
          }}
        >
          <Spinner />
        </CheeseWrapper>
      );
    }
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

          <Avatar
            avatarId={this.state.user.avatarId}
            userId={this.state.user.id}
          />
          <div
            id="stats"
            style={{ fontFamily: "showcard gothic", marginTop: "50px" }}
          >
            <h2>Dein Highscore</h2>
            <h4>{this.state.user.gameinfo.highscore}</h4>
            <h2>Abgefeuerte Gurken</h2>
            <h4></h4>
            <h2>Gesamt Spielzeit</h2>
            <h4>{this.state.user.gameinfo.timespend}</h4>
            <h2>Gesammelte Punkte Gesamt</h2>
            <h4>{this.state.user.gameinfo.points}</h4>
          </div>
        </CheeseWrapper>
        <div>
          <CheeseWrapper
            style={{
              width: "20%",
              height: "20em",
              margin: "auto",
              marginTop: "8em",
              textAlign: "center",
              position: "absolute",
              display: "inlineblock",
              marginLeft: "-27em"
            }}
          >
            <div
              id="rankinfo"
              style={{ fontFamily: "showcard gothic", marginTop: "30px" }}
            >
              <h2>Aktueller Rank</h2>
              <h3 style={{ color: this.state.user.currentRank.rank_color }}>
                {this.state.user.currentRank.rank_name}
              </h3>
              <h2>Nächster Rank</h2>
              <h4 style={{ color: this.state.user.nextRank.color }}>
                {this.state.user.nextRank.name}
              </h4>
              <h4>In</h4>
              <h4>
                {this.state.user.nextRank.points -
                  this.state.user.gameinfo.points}{" "}
                Points
              </h4>
            </div>
          </CheeseWrapper>
        </div>
      </div>
    );
  }
}
