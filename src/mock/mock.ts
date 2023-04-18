import { CardProps } from "../types/types";

let cards: CardProps[] = [];

cards = [
    {
        id: 1,
        name: 'Beautiful & luxurious apartment at great location',
        imgSrc: 'img/apartment-01.jpg',
        price: 120,
        type: 'Apartment',
        rating: 4,
        premium: true,
    },
    {
        id: 2,
        name: 'Wood and stone place',
        imgSrc: 'img/room.jpg',
        price: 80,
        type: 'Private room',
        rating: 4,
        active: true,
    },
    {
        id: 3,
        name: 'Canal View Prinsengracht',
        imgSrc: 'img/apartment-02.jpg',
        price: 132,
        type: 'Apartment',
        rating: 4,
    },
    {
        id: 4,
        name: 'Nice, cozy, warm big bed apartment',
        imgSrc: 'img/apartment-03.jpg',
        price: 180,
        type: 'Apartment',
        rating: 5,
        premium: true,
    },
    {
        id: 5,
        name: 'Wood and stone place',
        imgSrc: 'img/room.jpg',
        price: 80,
        type: 'Apartment',
        rating: 4,
        active: true,
    },
];

export default cards;