import React from "react";
import "./App.css";
import { Api } from "./Api";
import { observer, inject } from "mobx-react";
import { observable, toJS } from "mobx";
import { Switch, Route } from "react-router";
import { HashRouter } from "react-router-dom";

import { Form, Button, Navbar, Nav, FormControl } from "react-bootstrap";
import { Login } from "./Components";
import { Profil } from "./Components";
import { Game } from "./Components/Game/Game";

interface IAppProps {
  // injected
  api?: Api;
}

@inject("api")
@observer
class App extends React.Component<IAppProps> {
  @observable private isLoggedIn = false;
  @observable private loading = true;

  public async componentDidMount() {
    let valid = await this.props.api.validate();
    this.isLoggedIn = valid;
    this.loading = false;
  }

  public render() {
    if (this.loading) return <div />;
    if (!this.isLoggedIn)
      return (
        <Login
          onLogin={() => {
            window.location.assign("/");
          }}
        />
      );
    return (
      <div>
        <Navbar variant="dark" style={{ backgroundColor: "rgb(255, 171, 19)" }}>
          <img
            style={{
              borderRadius: "50%",
              border: "4px solid rgb(255, 199, 30)"
            }}
            src={"media/2579311_0.jpg"}
            width="40px"
            height="40px"
          ></img>
          <Navbar.Brand href="#profil/" style={{ paddingLeft: "15px" }}>
            {this.props.api.self.loginName}
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#profil/">Profil</Nav.Link>
            <Nav.Link href="#game">Game</Nav.Link>
            {this.props.api.permissionId === 0 && (
              <Nav.Link href="#admin">Admin</Nav.Link>
            )}
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Burger Soldiers"
              className="mr-sm-2"
            />
            <Button variant="outline-info">Search</Button>
          </Form>
          <div style={{ paddingLeft: "4px" }}>
            <Button
              onClick={() => {
                this.props.api.request("user.logout", {});
                window.location.assign("/");
              }}
              variant="outline-danger"
            >
              Logout
            </Button>
          </div>
        </Navbar>
        <HashRouter>
          <Switch>
            <Route exact path={"/"} component={Profil} key={"profil_home"} />
            <Route
              path={"/profil/:id"}
              component={e => <Profil id={e.match.params.id} />}
              key={"profil"}
            />
            <Route
              path={"/profil"}
              component={() => <Profil id={this.props.api.userId} />}
              key={"profil_id"}
            />
            <Route exact path={"/game"} component={Game} key={"game"} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
