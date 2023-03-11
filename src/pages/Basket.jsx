import React, {useContext, useEffect, useState} from 'react';
import {Card, Container, Spinner} from "react-bootstrap";
import {Context} from "../index";
import DeviceItem from "../components/DeviceItem";
import {observer} from "mobx-react-lite";
import BasketItem from "../components/BasketItem";

const Basket = observer(() => {
    const {device} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect( () => {
        const asyncGettingBasket = async () => {
            const basket = await JSON.parse(localStorage.getItem("basket"))
            if (basket) {
                device.setBasketItems(basket)
            }
        }
        asyncGettingBasket().finally(() => setLoading(false))
    }, [])
    return (
        <Container>
            {loading
                ?
                <Spinner/>
                :
                device.basketItems.map(item =>
                        <Card key={item.id }>
                            <BasketItem key={item.id} item={item}/>
                        </Card>
                )
            }

        </Container>
    );
})

export default Basket;