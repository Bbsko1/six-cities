import { SortNames } from "../const";
import { CardProps } from "../types/types";

export const sortingCards = (cards: CardProps[], sortName: SortNames): CardProps[] => {
    let sortCards = cards.slice();

    switch (sortName) {
        case SortNames.PriceAsc:
            return sortCards.sort((a, b) => a.price - b.price);
        case SortNames.PriceDesc:
            return sortCards.sort((a, b) => b.price - a.price);
        case SortNames.Rating:
            return sortCards.sort((a, b) => b.rating - a.rating);
        default: return sortCards;
    }
}