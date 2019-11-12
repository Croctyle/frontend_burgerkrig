import React from "react";
import "./App.css";
import { Api } from "./Api";
import { observer, inject } from "mobx-react";
import { observable, toJS } from "mobx";
import { Switch, Route } from "react-router";
import { HashRouter } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
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
    if (!this.isLoggedIn) return <Login />;
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Login} key={"login"} />
            <Route exact path={"/profil"} component={Profil} key={"profil"} />
            <Route exact path={"/game"} component={Game} key={"game"} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
