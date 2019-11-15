import * as React from "react";
import io from "socket.io-client";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import { Api } from "../../Api";

// export function ActionLog(){
//     let [ message, setMessage ] = React.useState([]);
//     // let client = new net.Socket();
//     // try {
//     //     client.connect(56829, "localhost");
//     //     client.on("data", (data) => {
//     //         setMessage([...message, data])
//     //     });
//     // } catch (err) {
//     //     client.destroy();
//     // }

    
//     return <div>
//         {message.map( e => {
//             return <div>{e}</div>
//         })}
//     </div>
// }

interface IActionLogProps {
    //injected
    api?: Api;
}

@inject("api")
@observer
export class ActionLog extends React.Component<IActionLogProps>{
    @observable private sendMessage = "";
    @observable private message = [];
    public componentDidMount() {
        const client = io.connect("http://localhost:56829");
        client.on("data", (data) => this.message.unshift(data));
    }

    public render() {
        return <div style={{height: "100%", background: "black"}}>
            {this.props.api.permissionId <= 10 && <input style={{width: "100%"}} value={this.sendMessage} onChange={(e) => this.sendMessage = e.target.value} onKeyDown={e => {
                if(e.keyCode === 13) {
                    this.props.api.request("user.chat", {message: this.sendMessage});
                    this.sendMessage = "";
                }
            }}/>}
            {this.message.map( e => {
                return <><code style={{color: e.perm === 0 ? "red" : "unset"}}>{e.message}</code><br/></>
            })}
    </div>
    }
}