import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, HashRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import NavBar from "./components/NavBar.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user, device} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    return (
        loading
            ? <Spinner animation={"grow"}/>
            :
            <HashRouter>
                <NavBar/>
                <AppRouter/>
            </HashRouter>
    );
});

export default App;