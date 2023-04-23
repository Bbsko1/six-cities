import Card from '../card/card';
import { CardProps } from '../../types/types';

type CardListProp = {
    cards: CardProps[];
    changeHover: (id: number) => void;
}

function CardList({cards, changeHover}: CardListProp) {
    return (
        <div className="cities__places-list places__list tabs__content">
            {cards.map((card) => <Card key={card.id} card={card} changeHover={() => changeHover(card.id)} />)}
        </div>
    );
}

export default CardList;
