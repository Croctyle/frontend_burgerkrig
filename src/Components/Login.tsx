import * as React from "react";
import { Api } from "../Api";
import { observer, inject } from "mobx-react";
import { observable, toJS } from "mobx";
import autobind from "autobind-decorator";
import { Form, Button } from "react-bootstrap";

interface ILoginProps {
  // injected
  api?: Api;
}

@inject("api")
@observer
export class Login extends React.Component<ILoginProps> {
  @observable private username: string;
  @observable private password: string;
  @observable private data: any;

  @autobind
  private onLogin() {
    this.props.api.login(this.username, this.password);
  }

  public async componentDidMount() {
    let data = await this.props.api.request("user.get", {
      pagesize: 10,
      page: 0
    });
    this.data = data;
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
            <Button onClick={this.onLogin}>Login</Button>
          </Form>
          {JSON.stringify(toJS(this.data))}
        </div>
      </div>
    );
  }
}
