import * as React from "react";
import { Api, IUser } from "../Api";
import { FormControl } from "react-bootstrap";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import autobind from "autobind-decorator";
import { Link } from "react-router-dom";

interface ISearchbarProps {
  // injected
  api?: Api;
}

@inject("api")
@observer
export class Searchbar extends React.Component<ISearchbarProps> {
  @observable private text = "";
  @observable private results = [];

  @observable private show = false;

  @autobind
  private async onChange(e) {
    this.text = e.target.value;
    if (this.text.length >= 4) {
      this.results = await this.props.api.request("user.get", {});
    }
  }

  public render() {
    return (
      <div style={{ display: "flex", position: "relative" }}>
        <FormControl
          type="text"
          placeholder="Burger Soldiers"
          className="mr-sm-2"
          value={this.text}
          onChange={this.onChange}
        />
        {!!this.results.length && !!this.text.length && (
          <div
            style={{
              position: "absolute",
              bottom: "-90px",
              background: "white",
              fontFamily: "bangers",
              width: "240px",
              borderRadius: "4px",
              backgroundColor: "rgb(255,171,19)"
            }}
          >
            <ul>
              {this.results.map((e: IUser) => {
                return (
                  <li>
                    <Link to={`/profil/${e.id}`}>{e.loginName}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
