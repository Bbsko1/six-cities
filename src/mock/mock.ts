import { CardProps } from '../types/types';

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
        location: {
            latitude: 52.3909553943508,
            longitude: 4.85309666406198,
        },
    },
    {
        id: 2,
        name: 'Wood and stone place',
        imgSrc: 'img/room.jpg',
        price: 80,
        type: 'Private room',
        rating: 4,
        active: true,
        location: {
            latitude: 52.369553943508,
            longitude: 4.85309666406198,
        },
    },
    {
        id: 3,
        name: 'Canal View Prinsengracht',
        imgSrc: 'img/apartment-02.jpg',
        price: 132,
        type: 'Apartment',
        rating: 4,
        location: {
            latitude: 52.3909553943508,
            longitude: 4.929309666406198,
        },
    },
    {
        id: 4,
        name: 'Nice, cozy, warm big bed apartment',
        imgSrc: 'img/apartment-03.jpg',
        price: 180,
        type: 'Apartment',
        rating: 5,
        premium: true,
        location: {
            latitude: 52.3809553943508,
            longitude: 4.939309666406198,
        },
    },
    {
        id: 5,
        name: 'Wood and stone place',
        imgSrc: 'img/room.jpg',
        price: 80,
        type: 'Apartment',
        rating: 4,
        active: true,
        location: {
            latitude: 52.3909553943508,
            longitude: 4.939309666406198,
        },
    },
];

export default cards;
