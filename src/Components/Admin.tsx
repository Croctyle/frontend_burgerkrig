import * as React from "react";
import { ActionLog } from "./Game/ActionLog";
import { Row, Col, Form } from "react-bootstrap";
import { CheeseWrapper } from "./CheeseWrapper";
import { ApiContext } from "..";

export function Admin() {
    return <div style={{padding: "25px 25px"}}>
        <Row>
            <Col xs={12} md={6}>
                <CheeseWrapper style={{height: "400px"}}>
                    <div style={{padding: "40px 40px"}}>
                        <h5>Chat-Panel</h5>
                        <ActionLog/>
                    </div>
                </CheeseWrapper>
            </Col>
            <Col xs={12} md={6}>
                <CheeseWrapper>
                    <div style={{padding: "40px 40px"}}>
                        <UserTable/>
                    </div>
                </CheeseWrapper>
            </Col>
        </Row>
    </div>
}


function UserTable() {
    const api = React.useContext(ApiContext);
    
    let [ userdata, setUserdata ] = React.useState<any[]>(null);
    let [ permissions, setPermissions ] = React.useState<any[]>(null);

    React.useEffect(() => {
        api.request("user.get", {}).then(e => setUserdata(e));
        api.request("permission.get", {}).then(e => setPermissions(e));
    }, []);

    // in case we dont have anything yet
    if(!(permissions && userdata)) return <div/>

    const renderOptions = (onClick: () => void, defaultValue: string) => {
        return <Form.Control defaultValue={defaultValue} as="select" onChange={(e) => console.log(e)}>
            {permissions.map(e => <option value={e.id}>{e.permissionName}</option>)}
        </Form.Control>
    }

    const renderCell = (user) => {
        return <tr>
            <td>{user.loginName}</td>
            <td>{renderOptions(() => {}, user.permission.id)}</td>
        </tr>
    }


    return <div> 
        <table>
            <th>
                <td>Name</td>
                <td>Rights</td>
            </th>
            {userdata.map(e => {
                return renderCell(e)
            })}
        </table>
    </div>
    
}