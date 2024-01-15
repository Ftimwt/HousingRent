import {MapComponent} from "@neshan-maps-platform/mapbox-gl-react";
import SDKMap from "@neshan-maps-platform/mapbox-gl/dist/src/core/Map";
import {useEffect, useState} from "react";
import Marker from "../components/maps/marker";
import Page from "./page";
import {Empty, Slider, Typography} from "antd";
import {useNearestEstateQuery} from "@housing_rent/redux/requests/estates";
import EstateGrid from "@housing_rent/components/estates/grid";
import Loading from "@housing_rent/components/loading/loading";
import KmSlider from "@housing_rent/components/slider/km";

interface MapPoint {
    loc: [number, number];
    type: string;
}

const Home = () => {
    const [map, setMap] = useState<SDKMap | undefined>(undefined);

    const [maxDistance, setDistance] = useState<number>(0.8);
    const [latitude, setLatitude] = useState<number>(36.423850587385715);
    const [longitude, setLongitude] = useState<number>(55.00636827275082);
    const [marker, setMarker] = useState<any>();


    const {data: nearestHomeResponse, isFetching: nearestLoading} = useNearestEstateQuery({
        latitude: latitude,
        longitude: longitude,
        max_distance: maxDistance
    });

    const loading = nearestLoading;

    useEffect(() => {
            if (!nearestHomeResponse || !map) return () => {
            };
            const {estates} = nearestHomeResponse;
            const points: MapPoint[] = estates.map(estate => ({
                loc: [estate.longitude, estate.latitude],
                type: 'building'
            }));
            const result = points.map(point => {
                const marker = Marker({icon: point.type as any});
                marker.setLngLat(point.loc);
                marker.addMap(map);
                return marker;
            });
            return () => {
                for (const marker of result) {
                    marker.remove();
                }
            };
        }, [nearestHomeResponse, map]
    )
    ;

    useEffect(() => {
        marker?.setLngLat([longitude, latitude])
    }, [latitude, longitude]);

    useEffect(() => {
        if (!map) return;

        (map as any).on('click', function (x: any) {
            console.log(typeof (x));
            setLatitude(x.lngLat.lat);
            setLongitude(x.lngLat.lng);
        })
    }, [map]);

    useEffect(() => {
        console.table({latitude, longitude});
    }, [latitude, longitude]);


    const createGeoJSONCircle = function (center: any, radiusInKm: any, points?: any) {
        if (!points) points = 64;

        const coords = {
            latitude: center[1],
            longitude: center[0]
        };

        const km = radiusInKm;

        const ret = [];
        const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
        const distanceY = km / 110.574;

        let theta, x, y;
        for (let i = 0; i < points; i++) {
            theta = (i / points) * (2 * Math.PI);
            x = distanceX * Math.cos(theta);
            y = distanceY * Math.sin(theta);

            ret.push([coords.longitude + x, coords.latitude + y]);
        }
        ret.push(ret[0]);

        return {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [ret]
                    }
                }]
            }
        };
    };

    useEffect(() => {
        if (!map) return () => {
        };
        let source = createGeoJSONCircle([longitude, latitude], maxDistance);
        (map as any).addSource("polygon", source);

        const layer: any = {
            "id": "polygon",
            "type": "fill",
            "source": "polygon",
            "layout": {},
            "paint": {
                "fill-color": "blue",
                "fill-opacity": 0.3
            }
        };

        (map as any).addLayer(layer);

        return () => {
            map.removeLayer("polygon")
            map.removeSource("polygon")
        }
    }, [longitude, latitude, maxDistance, map])

    let mapKey = import.meta.env.VITE_NESHAN_KEY;
    return <Page>
        <div className="flex flex-col gap-5 min-h-[500px] md:flex-col sm:flex-col lg:flex-row">
            <div className="w-full bg-white rounded shadow-1xl p-5">
                <div className="relative w-full h-full overflow-hidden rounded min-h-[500px]">
                    <MapComponent
                        className="absolute top-0 left-o bottom-0 right-0 h-full w-full"
                        options={{
                            mapKey: mapKey,
                            center: [55.00636827275082, 36.423850587385715],
                            zoom: 15,
                        }}
                        mapSetter={setMap}
                    />

                    <div className="w-[100px] absolute start-0 top-0 bottom-0 z-10 bg-secondary m-5 rounded hidden">
                    </div>
                </div>
            </div>

            <div className="w-full bg-white max-h-[600px] rounded shadow-1x p-5 flex flex-col gap-5">
                <div className="grid grid-cols-2">
                    <div className="w-full">
                        <h4>محدوده (کیلومتر)</h4>
                        <KmSlider onChange={setDistance} value={maxDistance}/>
                    </div>
                </div>
                <Loading loading={loading}>
                    {nearestHomeResponse?.estates.length ?
                        <>
                            <EstateGrid estates={nearestHomeResponse.estates}/>
                        </>
                        :
                        <div className="flex items-center m-auto">
                            <Empty
                                description="مسکنی در ۲ کیلومتری مکانی که شما انتخاب کرده اید یافت نشد."
                            />
                        </div>
                    }
                </Loading>
            </div>
        </div>

    </Page>
}

export default Home;
