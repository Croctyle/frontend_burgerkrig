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

  @autobind
  private async onRegister() {
    let i = await this.props.api.register(this.username, this.password);
    console.log(i);
  }

  public render() {
    return (
      <div style={{ margin: "auto", width: "50%" }}>
        <div
          style={{
            background: "#ffc71e",
            height: "40em",
            marginTop: "10em",
            padding: "5em",
            paddingTop: "5px",
            borderRadius: "30%",
            border: "11px solid rgb(255, 171, 19)",
            fontFamily: "showcard gothic",
            color: "lightyellow"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img src="logo.png" style={{ width: "40%" }} />
          </div>

          <Form>
            <Form.Label>Burgername</Form.Label>
            <Form.Control
              value={this.username}
              onChange={e => (this.username = e.target.value)}
            />
            <Form.Label>Burgerword</Form.Label>
            <Form.Control
              value={this.password}
              onChange={e => (this.password = e.target.value)}
              type="password"
            />
            <Button
              style={{
                marginTop: "12px",
                color: "white",
                borderColor: "orange"
              }}
              variant="outline-warning"
              onClick={this.onLogin}
            >
              ORDER BURGER!
            </Button>
            <Button
              style={{
                marginTop: "12px",
                color: "white",
                borderColor: "orange"
              }}
              variant="outline-warning"
              onClick={this.onRegister}
            >
              GET NEW BURGER!
            </Button>
          </Form>
        </div>
        <small>
          <a href="/">Datenschutzerklärung</a>
        </small>
      </div>
    );
  }
}
