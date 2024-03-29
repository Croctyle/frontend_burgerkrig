import * as React from "react";
import io from "socket.io-client";
import { ApiContext } from "../..";

interface IActionLogPros {
    onNewMessage?: () => void;
}

export function ActionLog(props: IActionLogPros) {
  let [text, setText] = React.useState("");
  let [messages, setMessage] = React.useState([]);
  const api = React.useContext(ApiContext);

  // to run function ONCE! Use empty
  React.useEffect(() => {
    const client = io.connect("http://www.nycaria.de:56829", {query: 'session='+api.session+'&id='+api.userId});
    client.on("data", data => {
      setMessage(msg => [data, ...msg]); // unshift
      if(props.onNewMessage) {
          // when new message, callback to provided function that something happened
          props.onNewMessage();
      }
    });
  }, []);

  return (
    <div style={{ height: "100%", textAlign: "center" }}>
        <input
          style={{ width: "100%", background: "rgb(255, 214, 90)" }}
          value={text}
          onChange={e => (setText(e.target.value))}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              api.request("user.chat", { message: text });
              setText("");
            }
          }}
        />
      <div style={{height: "200px", overflow: "auto"}}>
        {messages.map(e => {
          return (
            <>
              <code style={{ color: "saddlebrown" }}>
                {e.message}
              </code>
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
}
