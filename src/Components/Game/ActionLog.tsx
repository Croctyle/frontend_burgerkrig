import * as React from "react";
import io from "socket.io-client";
import { ApiContext } from "../..";

export function ActionLog() {
    let [ text, setText ] = React.useState("");
    let [ messages, setMessage ] = React.useState([]);
    const api = React.useContext(ApiContext);

    // to run function ONCE! Use empty 
    React.useEffect(() => {
        const client = io.connect("http://localhost:56829");
        client.on("data", (data) => {
            setMessage(msg => [data,...msg]) // unshift
        });
    }, [])

    return  <div style={{height: "100%", background: "black"}}>
    {api.permissionId <= 10 && <input style={{width: "100%"}} value={text} onChange={(e) => text = e.target.value} onKeyDown={e => {
        if(e.keyCode === 13) {
            api.request("user.chat", {message: text});
            setText("");
        }
    }}/>}
    {messages.map( e => {
        return <><code style={{color: e.perm === 0 ? "red" : "unset"}}>{e.message}</code><br/></>
    })}
</div>
}