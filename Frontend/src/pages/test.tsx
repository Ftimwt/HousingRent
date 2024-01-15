import Page from "@housing_rent/pages/page";
import {MapContext, useMap} from "@housing_rent/components/maps/context";
import Map from "@housing_rent/components/maps";
import {useContext, useEffect, useState} from "react";
import {Button} from "antd";
import Marker from "@housing_rent/components/maps/marker";

const def = {point: {latitude: 36.423850587385715, longitude: 55.00636827275082}}

const ButtonColor = () => {
    const x = useContext(MapContext);
    const handleClick = () => {
        const key = Marker({icon: 'caretaker'});
        const marker = x.addMarker({icon: 'caretaker', latlng: [x.selectedPoint.longitude, x.selectedPoint.latitude]});
    }
    return <Button className="z-10" onClick={handleClick}>Click</Button>;
}

const TestPage = () => {
    const [context] = useMap(def);

    return <Page title="صفحه آزمایش نقشه">
        <div className="flex flex-col">
            <MapContext.Provider value={context}>
                <Map/>
                <ButtonColor/>
            </MapContext.Provider>
        </div>
    </Page>;
}

export default TestPage;