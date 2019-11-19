import * as React from "react";
import { Api } from "../Api";
import { Form, Button } from "react-bootstrap";
import { ApiContext } from "..";

interface ILoginProps {
  // injected
  api?: Api;

  onLogin: () => void;
}

export function Login(props: ILoginProps) {
  const api = React.useContext(ApiContext);
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");

  const onLogin = async() => {
    console.log(username, password)
    let i = await api.login(username, password);
    if(i) props.onLogin();
  }

  const onRegister = async() => {
    api.register(username, password);
  }

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
            value={username}
            onChange={e => (setUsername(e.target.value))}
          />
          <Form.Label>Burgerword</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Button
            style={{
              marginTop: "12px",
              color: "white",
              borderColor: "orange"
            }}
            variant="outline-warning"
            onClick={onLogin}
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
            onClick={onRegister}
          >
            GET NEW BURGER!
          </Button>
        </Form>
      </div>
      <small>
        <a href="/">Datenschutzerklärung</a>
      </small>
    </div>);
}