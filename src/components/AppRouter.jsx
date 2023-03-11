import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {authRoutes, publicRoutes} from "../router";
import {Context} from "../index.jsx";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path,component}) =>
                <Route key={path} path={path} element={component}/>
            )}
            {publicRoutes.map(({path,component}) =>
                <Route key={path} path={path} element={component}/>
            )}
        </Routes>
    );
});

export default AppRouter;