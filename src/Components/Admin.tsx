import * as React from "react";
import { ActionLog } from "./Game/ActionLog";
import { Row, Col, Form } from "react-bootstrap";
import { CheeseWrapper } from "./CheeseWrapper";
import { ApiContext } from "..";

export function Admin() {
    return <Row>
        <Col xs={12} md={6}>
            <CheeseWrapper style={{height: "400px"}}>
                <ActionLog/>
            </CheeseWrapper>
        </Col>
        <Col xs={12} md={6}><UserTable/></Col>
    </Row>
}


function UserTable() {
    const api = React.useContext(ApiContext);
    
    let [ userdata, setUserdata ] = React.useState<any[]>(null);
    let [ permissions, setPermissions ] = React.useState<any[]>(null);

    React.useEffect(() => {
        api.request("user.get", {}).then(e => setUserdata(e));
        api.request("permission.get", {}).then(e => setPermissions([]))
    }, []);

    // in case we dont have anything yet
    if(!(permissions || userdata)) return <div/>

    const renderOptions = (onClick: () => void, defaultValue: string) => {
        return <Form.Control as="select" onChange={(e) => console.log(e)}>
            {permissions.map(e => <option value={e.id}>{e.permission.name}</option>)}
        </Form.Control>
    }

    const renderCell = (user) => {
        return <tr>
            <td>AAA</td>
            <td>{renderOptions(() => {}, null)}</td>
        </tr>
    }


    return <div> {
        userdata.map(e => {
            return renderCell(e)
        })
    } </div>
    
}