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
import { Admin } from "./Components/Admin";
import { ActionLog } from "./Components/Game/ActionLog";
import { Spinner } from "./Components/Spinner";
import { Avatar } from "./Components/Avatar";
import { Searchbar } from "./Components/Searchbar";

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
        <HashRouter>
          <Navbar
            variant="dark"
            style={{ backgroundColor: "rgb(255, 171, 19)" }}
          >
            <Avatar
              avatarId={this.props.api.self.avatarId}
              userId={this.props.api.self.id}
              size={60}
            />
            <Navbar.Brand href="#profil/" style={{ paddingLeft: "15px" }}>
              {this.props.api.self.loginName}
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#profil/">Profil</Nav.Link>
              <Nav.Link href="#game">Game</Nav.Link>
              {this.props.api.permissionId === 0 && "ADMIN"}
              <Nav.Link href="#test/">test</Nav.Link>
            </Nav>
            <Form inline>
              <Searchbar />
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
          {/** https://github.com/ReactTraining/react-router/issues/5455#issuecomment-346502188 */}
          <Route
            render={({ location }) => {
              return (
                <Switch key={location.key} location={location}>
                  <Route
                    exact
                    path={"/"}
                    component={Profil}
                    key={"profil_home"}
                  />
                  <Route path={"/test"} component={ActionLog} key={"test"} />
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
              );
            }}
          />
        </HashRouter>
      </div>
    );
  }
}

export default App;
