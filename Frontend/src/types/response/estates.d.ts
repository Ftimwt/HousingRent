interface NearestEstateResponseI {
    estates: EstateModel[];
    max_distance: number;
}

interface NearestEstateRequestI {
    latitude: number;
    longitude: number;
    max_distance?: number;
}