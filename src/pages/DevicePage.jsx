import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import bigStar from "../assets/bigStar.png"
import {useParams} from "react-router-dom";
import {fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const DevicePage = observer(() => {
    const {device} = useContext(Context)
    const [item, setItem] = useState({info: []})
    const {id} = useParams()
    const addToBasket = () => {
        device.setBasketItems([...device.basketItems, item])
        localStorage.setItem("basket", JSON.stringify(device.basketItems))
    }
    useEffect(() => {
        fetchOneDevice(id).then(data => setItem(data))
    },[])

    return (
        <Container className={"mt-3"}>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + item.img}/>
                </Col>
                <Col md={4}>
                    <Form className={"d-flex flex-column align-items-center"}>
                        <h2>{item.name}</h2>
                        <div
                            className={"d-flex justify-content-center align-items-center"}
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: "cover",
                                fontSize: 64
                            }}
                        >
                            {item.rating}
                        </div>
                    </Form>
                </Col>
                <Col md={4}>
                    <Card className={"d-flex flex-column align-items-center justify-content-around"}
                          style={{width:300, height: 300, fontSize:32, border:"5px solid lightgray"}}
                    >
                        <h3>from: {item.price}$</h3>
                        <Button variant={"outline-dark"} onClick={() => addToBasket()}>Add to basket</Button>
                    </Card>
                </Col>
            </Row>
            <Row className={"d-flex flex-column m-3"}>
                <h3>Features</h3>
                {item.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent"}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default DevicePage;