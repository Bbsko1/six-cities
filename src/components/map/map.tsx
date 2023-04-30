import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import { CardProps, CityProps } from '../../types/types';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
    cards: CardProps[],
    activeCardId: number | undefined,
    activeCity: CityProps,
}

const defaultCustomIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});


function Map({ cards, activeCardId, activeCity }: MapProps): JSX.Element {
    const mapRef = useRef(null);
    const map = useMap(mapRef, { lat: activeCity.location.latitude, lng: activeCity.location.longitude }, activeCity.location.zoom);

    useEffect(() => {
        const markers: Marker[] = [];
        
        if (map) {
            cards.forEach((card) => {
                const marker: Marker = new Marker({
                    lat: card.location.latitude,
                    lng: card.location.longitude,
                });
                if (card.id === activeCardId) {
                    marker.setIcon(currentCustomIcon);
                } else {
                    marker.setIcon(defaultCustomIcon);
                }
                marker.addTo(map);
                markers.push(marker);
            });
        }

        if (map) {
            return () => {
                markers.forEach((marker) => marker.removeFrom(map));
            };
        }
    }, [cards, activeCardId, activeCity, map]);

    return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;
