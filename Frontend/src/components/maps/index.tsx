import {MapComponent} from "@neshan-maps-platform/mapbox-gl-react";
import {useContext, useEffect} from "react";
import {MapContext} from "@housing_rent/components/maps/context";


export interface MapProps {
    latitude?: number;
    longitude?: number;
    className?: string;
}

const Map = (props: MapProps) => {
    const {map, setMap, center} = useContext(MapContext);

    // useEffect(() => {
    //     setCenter((prev) => ({
    //         latitude: props.latitude ?? prev.latitude,
    //         longitude: props.longitude ?? prev.longitude
    //     }));
    // }, [props.latitude, props.longitude]);

    useEffect(() => {
        if (!map || !center.latitude || !center.longitude) return;
        (map as any).setCenter([center.longitude, center.latitude]);
    }, [center, map]);

    return <MapComponent
        className="absolute top-0 left-o bottom-0 right-0 h-full w-full"
        options={{
            mapKey: import.meta.env.VITE_NESHAN_KEY,
            center: [center.longitude, center.latitude],
            zoom: 15,
        }}
        mapSetter={setMap}
    >
    </MapComponent>
}

export default Map;