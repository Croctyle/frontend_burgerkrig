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
                        <Tickets/>
                    </div>
                </CheeseWrapper>
            </Col>
        </Row>
    </div>
}


function Tickets() {
    const api = React.useContext(ApiContext);
    
    let [ ticketdata, setTicketdata ] = React.useState<any[]>([{t:""}]);

    React.useEffect(() => {
        api.request("user.getTickets", {}).then(e => setTicketdata(e));
    }, [])
    return <div> 
        {ticketdata.map(e => {
            JSON.stringify(e)
        })}
    </div>
    
}