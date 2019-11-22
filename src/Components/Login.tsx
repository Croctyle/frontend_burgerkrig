import * as React from "react";
import { Api } from "../Api";
import { Form, Button, Modal, Dropdown, Alert } from "react-bootstrap";
import { ApiContext } from "..";
import { Avatar } from "./Avatar";

interface ILoginProps {
  // injected
  api?: Api;

  onLogin: () => void;
}

export function Login(props: ILoginProps) {
  const api = React.useContext(ApiContext);
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [show, setShow] = React.useState(false);
  let [burger, setBurger] = React.useState(0);
  let [error, setError] = React.useState("");
  let [registerError, setRegisterError] = React.useState("");

  const onLogin = async () => {
    let i = await api.login(username, password);
    if(i.login) {
      props.onLogin();
    } else {
      setError(i.data.data.error)
    }
  };

  const onRegister = async () => {
    if (username.length === 0 || password.length === 0) return;
    let i = await api.register(username, password, burger);
    if(!i.data) {
      setRegisterError("Name already taken!");
    } else {
      setShow(false);
      setRegisterError("");
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header
          style={{
            backgroundColor: "#ffc71e",
            border: "3px solid rgb(255,171,19)",
            borderRadius: "3px"
          }}
          closeButton
        >
          <Modal.Title style={{ color: "saddlebrown" }}>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#ffc71e",
            border: "3px solid rgb(255,171,19)",
            borderRadius: "3px"
          }}
        >
          <Form style={{ display: "inlineblock" }}>
            <Form.Label style={{ paddingLeft: "300px", color: "saddlebrown" }}>
              Wähle einen Burger!
              <Dropdown>
                <Dropdown.Toggle id="avatarSelectRegister" variant="dark">
                  <Avatar avatarId={burger} size={20} noBorder />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => (
                    <Dropdown.Item
                      key={e}
                      onClick={() => {
                        setBurger(e);
                      }}
                    >
                      <Avatar avatarId={e} size={20} noBorder /> {e}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Label>
            <Form.Label
              style={{
                color: "saddlebrown",
                fontSize: "25px",
                paddingLeft: "0px"
              }}
            >
              Burgername
            </Form.Label>

            <Form.Control
              style={{
                width: "50%",
                marginRight: "auto"
              }}
              value={username}
              placeholder="Login Name"
              onChange={e => setUsername(e.target.value)}
            />
            <Form.Label
              style={{
                color: "saddlebrown",
                marginTop: "5px",
                fontSize: "25px",
                paddingLeft: "0px"
              }}
            >
              Burgerword
            </Form.Label>
            <Form.Control
              style={{
                paddingLeft: "20px",
                width: "50%",
                marginRight: "auto"
              }}
              placeholder="Passwort"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </Form>
          {registerError && <Alert variant="danger">{registerError}</Alert>}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#ffc71e",
            border: "3px solid rgb(255,171,19)",
            borderRadius: "3px"
          }}
        >
          {/** api.register(username, password); */}
          <Button onClick={onRegister} className="registerbutton">
            Register
          </Button>
        </Modal.Footer>
      </Modal>
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
            <div className="logo" style={{ marginTop: "25px" }}>
              <img
                src="burgerkrig_logo.png"
                style={{
                  width: "40%",
                  marginLeft: "250px",
                  borderRadius: "30%"
                }}
              />
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
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
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
              <Button className="registerbutton" onClick={() => setShow(true)}>
                REGISTER NEW BURGER!
              </Button>
              {error && <Alert variant="danger">{error}</Alert>}
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
    </>
  );
}
