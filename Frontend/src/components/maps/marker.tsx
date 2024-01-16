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
    latlng?: [number, number];
    onClick?: () => void;
}

export interface MarkerMethod {
    addMap: (map: SDKMap) => void;
    setLngLat: (point: [number, number]) => void;
    remove: () => void;
    setPopup: (_: MapPopupI) => void;
}

const Marker = ({icon, draggable, latlng, onClick}: MarkerOption): MarkerMethod => {
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

    marker.on('click', () => {
        onClick?.();
    })

    const markerDiv = marker.getElement();

    if (latlng)
        marker.setLngLat({lng: latlng[0], lat: latlng[1]});

    markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
    markerDiv.addEventListener('mouseleave', () => marker.togglePopup());

    markerDiv.addEventListener('click', () => onClick?.());

    if (draggable)
        marker.setDraggable(draggable);

    const addMap = (map: SDKMap) => {
        marker.addTo(map as any)
    }

    const remove = () => {
        marker.remove();
    }

    const setLngLat = (latlng: [number, number]) => {
        marker.setLngLat({lng: latlng[0], lat: latlng[1]});
    }

    const setPopup = ({text, image}: MapPopupI) => {
        const html = `<div class="flex flex-col gap-3">
            <img src="${image}" alt="can not found the photo !" class="">
            <div>
            ${text}
            </div>
        </div>`

        const popup = new nmp_mapboxgl.Popup({offset: 25}).setHTML(html);
        marker.setPopup(popup);
    }

    return {addMap, remove, setLngLat, setPopup};
}

export default Marker;