import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {Card, Col, Image} from "react-bootstrap";
import {DEVICE_ROUTE} from "../utils/consts";
import rating from "../assets/rating.png";

const BasketItem = ({item}) => {
    const {device} = useContext(Context)
    const navigate = useNavigate()
    return (
        <Col className={"mt-3"} md={3} onClick={() => navigate(DEVICE_ROUTE + "/" + item.id)}>
            <Card style={{width: 150, cursor: "pointer"}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + item.img}/>
                <div className={"text-black-50 mt-1 d-flex justify-content-between align-items-center"}>
                    <div>{async () => await device.brands.find(obj => obj.id === item.brandId).name}</div>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <div>{item.rating}</div>
                        <Image width={13} height={13} src={rating}/>
                    </div>
                </div>
                <div>{item.name}</div>
            </Card>
        </Col>
    );
};

export default BasketItem;