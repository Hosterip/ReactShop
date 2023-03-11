import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index.jsx";
import {Card} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <div className={"d-flex flex-row"} >
            {device.brands.map(brand =>
                <Card
                    style={{cursor:"pointer",flex:"0 1 auto"}}
                    key={brand.id}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? "danger" : "light"}
                >
                    {brand.name}
                </Card>
            )}
        </div>
    );
});

export default BrandBar;