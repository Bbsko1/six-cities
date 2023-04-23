import { useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';

function useMap(
    mapRef: MutableRefObject<HTMLElement | null>,
    center: {
        lat: number,
        lng: number
    }
): Map | null {
    const [map, setMap] = useState<Map | null>(null);

    useEffect(() => {
        if (mapRef.current !== null && map === null) {
            const instance = new Map(mapRef.current, {
                center: {
                    lat: center.lat,
                    lng: center.lng
                },
                zoom: 10
            });

            const layer = new TileLayer(
                'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                }
            );

            instance.addLayer(layer);

            setMap(instance);
        }
    }, [mapRef, map, center]);

    useEffect(() => {
        if (map !== null) {
            map.panTo({
                lat: center.lat,
                lng: center.lng,
            });
        }
    }, [map, center]);

    return map;
}

export default useMap;
