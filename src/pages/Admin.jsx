import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateDevice from "../components/Modals/CreateDevice.jsx";
import CreateBrand from "../components/Modals/CreateBrand.jsx";
import CreateType from "../components/Modals/CreateType.jsx";

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    return (
        <Container className={"d-flex flex-column"}>
            <Button onClick={() => setTypeVisible(true)} variant={"outline-dark"} className={"mt-4"}>Add type</Button>
            <Button onClick={() => setBrandVisible(true)} variant={"outline-dark"} className={"mt-4"}>Add brand</Button>
            <Button onClick={() => setDeviceVisible(true)} variant={"outline-dark"} className={"mt-4"}>Add device</Button>

            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    );
};

export default Admin;