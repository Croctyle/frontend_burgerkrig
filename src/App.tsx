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
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
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
