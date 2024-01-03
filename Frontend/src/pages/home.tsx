import {MapComponent} from "@neshan-maps-platform/mapbox-gl-react";
import SDKMap from "@neshan-maps-platform/mapbox-gl/dist/src/core/Map";
import {useEffect, useState} from "react";
import Marker from "../components/marker";
import Page from "./page";
import {Card, Pagination} from "antd";

const Home = () => {
    const [map, setMap] = useState<SDKMap | undefined>(undefined);

    useEffect(() => {
            if (!map) return;
            const points = [
                {loc: [55.00636827275082, 36.423850587385715], type: 'apartment'},
                {
                    loc: [55.00736827275082, 36.423860587385715], type: 'building'
                }
            ]

            for (const point of points) {
                const marker = Marker({icon: point.type as any});
                marker.setLngLat(point.loc as any);
                marker.addMap(map);
            }
        }
        ,
        [map]
    )
    ;

    return <Page>
        <div className="flex flex-row gap-5 min-h-[500px]">
            <div className="w-full bg-white rounded shadow-1xl p-5">
                <div className="relative w-full h-full overflow-hidden rounded">
                    <MapComponent
                        onClick={console.log}
                        className="absolute top-0 left-o bottom-0 right-0 h-full w-full"
                        options={{
                            mapKey: import.meta.env.VITE_NESHAN_KEY,
                            center: [55.00636827275082, 36.423850587385715],
                            zoom: 15,
                        }}
                        mapSetter={setMap}
                    />

                    <div className="w-[100px] absolute start-0 top-0 bottom-0 z-10 bg-secondary m-5 rounded hidden">
                    </div>
                </div>
            </div>

            <div className="w-full bg-white rounded shadow-1x p-5 flex flex-col gap-5">
                <div className="grid gap-5 grid-cols-3 justify-items-stretch">
                    {new Array(10).fill({}).map(() => (
                        <Card className="shadow" size="small" title="Small size card" extra={<a href="#">More</a>}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    ))
                    }
                </div>
                <Pagination/>
            </div>
        </div>

    </Page>
}

export default Home;
