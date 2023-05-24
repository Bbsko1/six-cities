import Card from '../card/card';
import { CardProps } from '../../types/types';

type CardListProp = {
    cards: CardProps[];
}

function CardList({cards}: CardListProp) {
    return (
        <div className="cities__places-list places__list tabs__content">
            {cards.map((card) => <Card key={card.id} card={card} />)}
        </div>
    );
}

export default CardList;
