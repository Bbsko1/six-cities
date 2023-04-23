type Location = {
    latitude: number;
    longitude: number;
}

export type CardProps = {
    id: number;
    name: string;
    imgSrc: string;
    type: string;
    price: number;
    rating: number;
    active?: boolean;
    premium?: boolean;
    location: Location;
}

/* export type Point = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export type Points = Point[]; */
