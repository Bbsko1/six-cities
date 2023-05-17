import { CardProps, CityProps } from '../types/types';

export const getCities = (cards: CardProps[]): CityProps[] | null => {
    const cities: string[] = [];
    const citiesData: CityProps[] = [];

    if (!cards.length) {return null;}

    cards.forEach((card) => {
        if (!cities.includes(card.city.name)) {
            cities.push(card.city.name);
            citiesData.push(card.city);
        }
    });

    citiesData.sort((a, b) => a.name.localeCompare(b.name));

    return citiesData;
};
