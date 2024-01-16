import React, {createContext, useCallback, useEffect, useState} from "react";
import Marker, {MarkerMethod, MarkerOption} from "@housing_rent/components/maps/marker";
import SDKMap from "@neshan-maps-platform/mapbox-gl/dist/src/core/Map";
import {createGeoJSONCircle} from "@housing_rent/components/maps/draw_radius_km";

export interface MapContextI {
    center: PointI;
    setCenter: (_: React.SetStateAction<PointI>) => void;
    markers: MarkerMethod[];
    addMarker: (_: MarkerOption) => MarkerMethod | undefined;
    map?: SDKMap;
    setMap: (map: SDKMap) => void;
    selectedPoint: PointI;
    drawCircleInKm: (center: PointI, radiusInKm: number, points?: number) => CircleName;
    removeCircle: (name: CircleName) => void;
}

export const MapContext = createContext<MapContextI>({
    center: {latitude: 0, longitude: 0},
    markers: [],
    map: undefined,
    setCenter: (_: React.SetStateAction<PointI>) => {
    },
    addMarker: () => undefined,
    setMap: (_: SDKMap) => {
    },
    selectedPoint: {latitude: 0, longitude: 0},
    drawCircleInKm: () => '',
    removeCircle: () => {
    },
})

export interface MapContextProviderProps {
    point?: PointI;
}

export const useMap = (props: MapContextProviderProps) => {
    const [map, setMap] = useState<SDKMap>();
    const [markers, setMarkers] = useState<MarkerMethod[]>([]);
    const [center, setCenter] = useState<PointI>({latitude: 0, longitude: 0});
    const [selectedPoint, setSelectedPoint] = useState<PointI>({latitude: 0, longitude: 0});

    const [circle, setCircle] = useState<number>(0);

    useEffect(() => {
        if (!props.point) return;
        setCenter({...props.point});
    }, [props?.point, map]);

    const addMarker = useCallback((option: MarkerOption) => {
        if (!map) return;
        const marker = Marker(option);
        setMarkers((prev) => [...prev, marker]);
        if (option.latlng) {
            marker.setLngLat(option.latlng);
        }
        marker.addMap(map)
        return marker;
    }, [map]);

    const drawCircleInKm = useCallback((center: PointI, radiusInKm: number, points?: number): CircleName => {
        if (!map) return "";
        const source = createGeoJSONCircle(center, radiusInKm, points);
        setCircle(x => x + 1);
        let id = "polygon" + circle;
        (map as any).addSource(id, source);

        const layer: any = {
            "id": id,
            "type": "fill",
            "source": id,
            "layout": {},
            "paint": {
                "fill-color": "blue",
                "fill-opacity": 0.3
            }
        };

        (map as any).addLayer(layer);

        return id;
    }, [map, circle]);

    const removeCircle = useCallback((id: CircleName) => {
        if (!map || id == "") return;
        map.removeLayer(id);
        map.removeSource(id);
    }, [map]);

    useEffect(() => {
        if (!map) return;

        (map as any).on('click', function (x: any) {
            setSelectedPoint({latitude: x.lngLat.lat, longitude: x.lngLat.lng});
        })
    }, [map]);

    const value: MapContextI = {
        addMarker,
        markers,
        center,
        setCenter,
        setMap,
        selectedPoint,
        map,
        drawCircleInKm,
        removeCircle
    }

    return [value];
}