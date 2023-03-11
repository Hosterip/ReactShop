import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPI";

const CreateBrand = ({show,onHide}) => {
    const [value, setValue] = useState("")
    const addType = (e) => {
        e.preventDefault()
        createBrand(({name: value})).then(data => setValue(""))
        onHide()
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
                    Add new brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={addType}>
                    <Form.Control
                        placeholder={"Enter name of the type"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addType}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;