import React, {useContext} from 'react';
import {Context} from "../index.jsx";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE} from "../utils/consts.js";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem("token")
    }
    return (
        <Navbar bg="dark" variant={"dark"} expand="lg">
            <Container>
                <Link style={{textDecoration: "none", color: "white", fontWeight: "600", fontSize: "16"}}
                      to="/">JustBuy</Link>
                {user.isAuth
                    ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Admin Panel</Button>
                        <Button variant={"outline-light"} onClick={() => navigate(BASKET_ROUTE)} style={{margin: "0 0 0 10px"}}>Basket</Button>
                        <Button variant={"outline-danger"} style={{margin: "0 0 0 10px"}} onClick={logOut}>Exit</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Authorization</Button>
                        <Button variant={"outline-light"} onClick={() => navigate(BASKET_ROUTE)} style={{margin: "0 0 0 10px"}}>Basket</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;