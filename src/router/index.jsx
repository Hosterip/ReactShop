import Admin from "../pages/Admin.jsx";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts.js";
import Basket from "../pages/Basket.jsx";
import Shop from "../pages/Shop.jsx";
import Auth from "../pages/Auth.jsx";
import DevicePage from "../pages/DevicePage.jsx";
import {Navigate} from "react-router-dom";

export const authRoutes = [
    {path: ADMIN_ROUTE, component: <Admin/>},
    {path: BASKET_ROUTE, component: <Basket/>},
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        component: <Shop/>
    },
    {
        path: LOGIN_ROUTE,
        component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Auth/>
    },
    {
        path: DEVICE_ROUTE + "/:id",
        component: <DevicePage/>
    },
    {
        path: "*",
        component: <Navigate to="/"/>
    },

]