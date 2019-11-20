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

  const onLogin = async () => {
    console.log(username, password);
    let i = await api.login(username, password);
    if (i) props.onLogin();
  };

  const onRegister = async () => {
    api.register(username, password);
  };

  return (
    <div style={{ margin: "auto", width: "50%" }}>
      <div>
        <div
          className="mask"
          style={{
            height: "40em",
            marginTop: "10em",
            padding: "5em",
            paddingTop: "5px",
            borderRadius: "30%",
            border: "15px solid rgb(255, 171, 19)",
            fontFamily: "bangers",
            color: "lightyellow"
          }}
        >
          <div className="logo" style={{ marginTop: "50px" }}>
            <img src="logo.png" style={{ width: "30%", marginLeft: "340px" }} />
          </div>
          <Form style={{ display: "inlineblock" }}>
            <Form.Label
              style={{
                color: "saddlebrown",
                fontSize: "25px",
                paddingLeft: "196px"
              }}
            >
              Burgername
            </Form.Label>
            <Form.Control
              style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
              value={username}
              placeholder="Login Name"
              onChange={e => setUsername(e.target.value)}
            />
            <Form.Label
              style={{
                color: "saddlebrown",
                marginTop: "5px",
                fontSize: "25px",
                paddingLeft: "196px"
              }}
            >
              Burgerword
            </Form.Label>
            <Form.Control
              style={{
                paddingLeft: "20px",
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              placeholder="Passwort"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <Button className="loginbutton" onClick={onLogin}>
              LOGIN BURGER!
            </Button>
            &nbsp;&nbsp;
            <Button className="registerbutton" onClick={onRegister}>
              REGISTER NEW BURGER!
            </Button>
            <div style={{ marginTop: "101px", paddingLeft: "504px" }}>
              <small>
                <a style={{ color: "saddlebrown" }} href="/">
                  Datenschutzerklärung
                </a>
              </small>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
