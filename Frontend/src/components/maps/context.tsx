import React, {createContext, useCallback, useEffect, useState} from "react";
import Marker, {MarkerMethod, MarkerOption} from "@housing_rent/components/maps/marker";
import SDKMap from "@neshan-maps-platform/mapbox-gl/dist/src/core/Map";

interface PointI {
    latitude: number;
    longitude: number;
}

export interface MapContextI {
    center: PointI;
    onPointChange: () => void;
    markers: MarkerMethod[];
    addMarker: (_: MarkerOption) => void;
    map?: SDKMap;
}

export const MapContext = createContext<MapContextI>({
    center: {latitude: 0, longitude: 0},
    markers: [],
    map: undefined,
    onPointChange: () => {
    },
    addMarker: () => {
    },
})

export interface MapContextProviderProps {
    children: React.ReactNode;
}

export const MapContextProvider = (props: MapContextProviderProps) => {
    const [map, setMap] = useState<SDKMap>();
    const [markers, setMarkers] = useState<MarkerMethod[]>([]);
    const [center, setCenter] = useState<PointI>([0, 0]);

    const addMarker = useCallback((option: MarkerOption) => {
        if (!map) return;
        const marker = Marker(option);
        marker.addMap(map)
        setMarkers((prev) => [...prev, marker]);
    }, [map]);

    const value: MapContextI = {
        addMarker,
        markers,
        center
    }

    return <MapContext.Provider value={value}></MapContext.Provider>;
}