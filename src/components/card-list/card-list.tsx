import Card from '../card/card';
import { CardProps } from '../../types/types';

type CardListProp = {
    cards: CardProps[];
    onSetActiveCard: (id: number) => void;
}

function CardList({cards, onSetActiveCard}: CardListProp) {
    return (
        <div className="cities__places-list places__list tabs__content">
            {cards.map((card) => <Card key={card.id} card={card} mouseEnter={() => {onSetActiveCard(card.id);}} />)}
        </div>
    );
}

export default CardList;
