import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row, Nav} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts.js";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../http/userAPI.js";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mt-2"
                        type="email"
                        name="email"
                        autoComplete="on"
                        placeholder="Enter email..."/>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="mt-2"
                        placeholder="Enter password..."
                        type="password" name="password"
                        autoComplete="on"/>
                    <div className="d-flex flex-row justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            {isLogin
                                ?
                                <div>
                                    No account? <Link to={REGISTRATION_ROUTE}>Register!</Link>
                                </div>
                                :
                                <div>
                                    Do you have an account? <Link to={LOGIN_ROUTE}>Login!</Link>
                                </div>
                            }
                        </div>
                        {isLogin
                            ?
                            <Button
                                onClick={click}
                                className="align-self-end"
                                variant="outline-success"
                            >
                                Enter
                            </Button>
                            :
                            <Button
                                onClick={click}
                                className="align-self-end"
                                variant="outline-success"
                            >
                                Register
                            </Button>
                        }
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;