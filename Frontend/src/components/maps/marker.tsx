import SDKMap from "@neshan-maps-platform/mapbox-gl/dist/src/core/Map";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";

const icons = {
    apartment: "apartment-64.png",
    building: "building-64.png",
    caretaker: "caretaker-64.png",
    country_house: "country-house-64.png",
    front_gate_open: "front-gate-open-64.png",
    house: "house-64.png",
    house_icon: "house-icon.png",
    land_sales: "land-sales-64.png",
    rental_house_contract: "rental-house-contract-64.png",
    skyscrapers: "skyscrapers-64.png",
}

export interface MarkerOption {
    icon: keyof typeof icons;
    draggable?: boolean;
    latlng: [number, number];
}

export interface MarkerMethod {
    addMap: (map: SDKMap) => void;
    setLngLat: (point: [number, number]) => void;
    remove: () => void;
}

const Marker = ({icon, draggable}: MarkerOption): MarkerMethod => {
    const el = document.createElement('div');
    el.className = 'marker';

    const width = 64;
    const height = 64;

    el.style.backgroundImage = `url(/icons/${icons[icon]})`;
    el.style.width = `${width}px`;
    el.className = 'marker';
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';

    const marker = new nmp_mapboxgl.Marker(el);

    if (draggable)
        marker.setDraggable(draggable);

    const addMap = (map: SDKMap) => {
        marker.addTo(map as any)
    }

    const remove = () => {
        marker.remove();
    }

    const setLngLat = (latlng: [number, number]) => {
        marker.setLngLat(latlng);
    }

    return {addMap, remove, setLngLat}
}

export default Marker;