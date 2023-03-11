import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index.jsx";
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({onHide, show}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrand(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title:"", description: "", number: Date.now()}])
    }
    const removeInfo =(number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]:value} : i))
    }
    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", `${cost}`)
        formData.append("img", file)
        formData.append("brandId", device.selectedBrand.id)
        formData.append("typeId", device.selectedType.id)
        formData.append("info", JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={"mt-2, mb-2"}>
                        <Dropdown.Toggle>{device.selectedType.name || "Choose Type"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={"mt-2, mb-2"}>
                        <Dropdown.Toggle>{device.selectedBrand.name || "Choose Brand"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={"mt-3"}
                        placeholder={"Enter name of the device"}
                    />
                    <Form.Control
                        value={cost}
                        onChange={e => setCost(Number(e.target.value))}
                        className={"mt-3"}
                        placeholder={"Cost of the device"}
                        type="number"
                    />
                    <Form.Control
                        className={"mt-3"}
                        placeholder={"Image of the device"}
                        type={"file"}
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button onClick={addInfo} variant={"outline-dark"}>Add new feature</Button>
                    {
                        info.map(i =>
                            <Row className={"mt-2"} key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeInfo("title", e.target.value, i.number)}
                                        placeholder={"Title of the feature"}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeInfo("description", e.target.value, i.number)}
                                        placeholder={"Enter description of feature"}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button variant={"outline-danger"} onClick={() => removeInfo(i.number)}>Delete</Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;