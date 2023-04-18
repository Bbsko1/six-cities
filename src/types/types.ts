export type CardProps = {
    id: number;
    name: string;
    imgSrc: string;
    type: string;
    price: number;
    rating: number;
    active?: boolean;
    premium?: boolean;
}