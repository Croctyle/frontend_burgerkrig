import * as React from "react";
import { Api } from "../Api";
import { CheeseWrapper } from "./CheeseWrapper";
import { Button, Form } from "react-bootstrap";
import { ApiContext } from "..";

export interface IDiscordState {
  user: any;
}

export interface IDiscordProps {
  id: number;
  // injected
  api?: Api;
}

export const Discord: React.FC<IDiscordProps> = props => {
  const api = React.useContext(ApiContext);
  let [user, setUser] = React.useState(null);
  let [connected, setConnected] = React.useState(false);
  let [discordID, setDiscordID] = React.useState("");

  React.useEffect(() => {
    api
      .request("user.getById", {
        userId: props.id || api.userId
      })
      .then(e => {
        setUser(e);
      });
  }, []);
  if (!connected) {
    return (
      <div>
        <CheeseWrapper
          style={{
            width: "18%",
            height: "13em",
            margin: "auto",
            marginTop: "20em",
            textAlign: "center"
          }}
        >
          <img
            src="../nycaria.png"
            style={{
              width: "39%",
              height: "50%",
              borderRadius: "20px",
              marginTop: "-39px",
              marginLeft: "27px"
            }}
          ></img>
          <Form.Label
            style={{
              color: "saddlebrown",
              marginTop: "5px",
              fontSize: "25px",
              paddingLeft: "196px"
            }}
          >
            Discord ID
          </Form.Label>
          <Form.Control
            style={{
              paddingLeft: "20px",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto"
            }}
            placeholder="Discord ID"
            value={discordID}
            onChange={e => setDiscordID(e.target.value)}
            type="ID"
          />
          <Button
            className="discordbutton"
            style={{ marginTop: "122px", marginLeft: "-125px" }}
            onClick={() => {
              setConnected(true);
              api.request("user.connectNycaria", { discordid: discordID });
            }}
          >
            Connect to Nycaria
          </Button>
        </CheeseWrapper>
      </div>
    );
  } else {
    return (
      <CheeseWrapper
        style={{
          width: "35%",
          height: "30em",
          margin: "auto",
          marginTop: "10em",
          textAlign: "center"
        }}
      >
        <img
          style={{ marginTop: "30px", marginLeft: "20px" }}
          className="discordImage"
          src="../burgerkrig_logo.png"
        ></img>
        <div>Discord name</div>
        <Button
          className="discordbutton"
          style={{ marginTop: "80px", marginLeft: "20px" }}
          onClick={() => setConnected(false)}
        >
          Disconnect from Nycaria
        </Button>
      </CheeseWrapper>
    );
  }
};
