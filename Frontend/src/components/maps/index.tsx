import {MapComponent} from "@neshan-maps-platform/mapbox-gl-react";
import {useState} from "react";
import SDKMap from "@neshan-maps-platform/mapbox-gl/dist/src/core/Map";


interface Props {
    latitude?: number;
    longitude?: number;
    className?: string;
}

const Map = (props: Props) => {
    const [map, setMap] = useState<SDKMap | undefined>(undefined);
    const [latitude, setLatitude] = useState<number>(props.latitude ?? 36.423850587385715);
    const [lng, setLng] = useState<number>(props.longitude ?? 55.00636827275082);

    return <MapComponent
        className="absolute top-0 left-o bottom-0 right-0 h-full w-full"
        options={{
            mapKey: import.meta.env.VITE_NESHAN_KEY,
            center: [lng, latitude],
            zoom: 15,
        }}
        mapSetter={setMap}
    />
}

export default Map;