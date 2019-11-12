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
  @observable private data: any;

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
            background: "ghostwhite",
            height: "40em",
            marginTop: "10em",
            textAlign: "center"
          }}
        >
          <h3>Burger-krig</h3>
          <Form>
            <Form.Control
              value={this.username}
              onChange={e => (this.username = e.target.value)}
            />
            <Form.Control
              value={this.password}
              onChange={e => (this.password = e.target.value)}
              type="password"
            />
            <div>
              <Button onClick={this.onLogin}>Login</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
