import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import { Api } from "./Api";
const Prov: any = Provider;

export const ApiContext =  React.createContext<Api>(null)

const api = new Api();

ReactDOM.render(
  <Prov api={api}>
    <ApiContext.Provider value={api}>
      <App />
    </ApiContext.Provider>
  </Prov>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
