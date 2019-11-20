import React, { useEffect, useContext, useState } from "react";
import { ApiContext } from "..";
import { Form } from "react-bootstrap";

interface IPermissionSelectProps {
    onChange: (newId: number) => void;
    defaultValue: number;
}

export function PermissionSelect(props) {
    const api = useContext(ApiContext);

    let [ permissions, setPermissions ] = useState([]);
    let [ loading, setLoading ] = useState(false);

    let { defaultValue, onChange } = props;

    useEffect(() => {
        setLoading(true);
        api.request("permission.get", {}).then(e => {
            setPermissions(e);
            setLoading(false);
        })
    }, []);

    return <>{defaultValue}<Form.Control defaultValue={`${defaultValue}`} as="select" onChange={onChange}>
        {permissions.map(e => <option value={e.id}>{e.permissionName}</option>)}
    </Form.Control></>
}