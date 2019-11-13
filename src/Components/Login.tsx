import * as React from "react";
import { Api } from "../Api";
import { observer, inject } from "mobx-react";
import { observable, toJS } from "mobx";
import autobind from "autobind-decorator";
import { Form, Button } from "react-bootstrap";

interface ILoginProps {
  // injected
  api?: Api;

  onLogin: () => void;
}

@inject("api")
@observer
export class Login extends React.Component<ILoginProps> {
  @observable private username: string;
  @observable private password: string;

  @autobind
  private async onLogin() {
    let i = await this.props.api.login(this.username, this.password);
    if (i) {
      this.props.onLogin();
    }
  }

  public render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "50%",
            margin: "auto",
            background: "#ffc71e",
            height: "40em",
            marginTop: "10em",
            padding: "5em",
            paddingTop: "5px",
          }}
        >
          <div style={{textAlign: "center"}}>
            <img src="bg.png" style={{width: "40%"}}/>
          </div>
          <h3>Burger-krig</h3>
          <h6>Sign in</h6>
          <Form>
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={this.username}
              onChange={e => (this.username = e.target.value)}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.password}
              onChange={e => (this.password = e.target.value)}
              type="password"
            />
            <div>
              <Button style={{marginTop: "12px"}} onClick={this.onLogin}>Login</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
