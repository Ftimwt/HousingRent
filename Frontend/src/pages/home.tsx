import {useEffect, useState} from "react";
import Page from "./page";
import {Empty} from "antd";
import {useNearestEstateQuery} from "@housing_rent/redux/requests/estates";
import EstateGrid from "@housing_rent/components/estates/grid";
import Loading from "@housing_rent/components/loading/loading";
import KmSlider from "@housing_rent/components/slider/km";
import {MapContext, useMap} from "@housing_rent/components/maps/context";
import Map from "@housing_rent/components/maps";
import {createGeoJSONCircle} from "@housing_rent/components/maps/draw_radius_km";

interface MapPoint {
    loc: [number, number];
    type: string;
}

const def = {point: {latitude: 36.423850587385715, longitude: 55.00636827275082}}

const Home = () => {
    const [maxDistance, setDistance] = useState<number>(0.8);

    const [mapContext] = useMap(def);

    const {data: nearestHomeResponse, isFetching: nearestLoading} = useNearestEstateQuery({
        latitude: mapContext.selectedPoint.latitude,
        longitude: mapContext.selectedPoint.longitude,
        max_distance: maxDistance
    });

    const loading = nearestLoading;

    useEffect(() => {
            if (!nearestHomeResponse || !mapContext.map) return () => {
            };
            const {estates} = nearestHomeResponse;
            const points: MapPoint[] = estates.map(estate => ({
                loc: [estate.longitude, estate.latitude],
                type: 'building'
            }));


            const result = points.map(point => {
                return mapContext.addMarker({
                    icon: 'building',
                    latlng: point.loc
                })!;
            });
            return () => {
                for (const marker of result) {
                    marker.remove();
                }
            };
        }, [nearestHomeResponse, mapContext.map]
    );


    useEffect(() => {
        const id = mapContext.drawCircleInKm(mapContext.selectedPoint, maxDistance);
        return () => {
            mapContext.removeCircle(id);
        }
    }, [mapContext.selectedPoint, maxDistance, mapContext.map])

    return <Page>
        <div className="flex flex-col gap-5 min-h-[500px] md:flex-col sm:flex-col lg:flex-row">
            <div className="w-full bg-white rounded shadow-1xl p-5">
                <div className="relative w-full h-full overflow-hidden rounded min-h-[500px]">
                    <MapContext.Provider value={mapContext}>
                        <Map/>
                    </MapContext.Provider>

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
