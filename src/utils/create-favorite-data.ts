import { CardProps, FavoriteProps } from "../types/types";

export const createFavoriteData = (cards: CardProps[]): FavoriteProps[] => {
    const cities = new Set<string>();

    cards.forEach(card => {
        cities.add(card.city.name);
    });

    const citiesObj = [...cities].sort().map((city, index): FavoriteProps => ({
        id: index,
        cityName: city,
        cards: cards.filter(card => card.city.name === city),
    }));

    return citiesObj;
};