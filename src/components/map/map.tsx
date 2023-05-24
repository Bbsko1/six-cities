import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import { CardProps, Location } from '../../types/types';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type MapProps = {
    cards: CardProps[];
    location: Location;
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


function Map({ cards, location }: MapProps): JSX.Element {
    const mapRef = useRef(null);
    const map = useMap(mapRef, { lat: location.latitude, lng: location.longitude }, location.zoom);
    const {activeCard} = useTypedSelector((state) => state.CARDS);

    useEffect(() => {
        const markers: Marker[] = [];

        if (map) {
            cards.forEach((card) => {
                const marker: Marker = new Marker({
                    lat: card.location.latitude,
                    lng: card.location.longitude,
                });
                if (card.id === activeCard) {
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
    }, [cards, activeCard, location, map]);

    return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;
