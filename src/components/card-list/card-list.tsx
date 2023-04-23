/* eslint-disable no-console */
/* import { useState } from 'react'; */
import Card from '../card/card';
import { CardProps } from '../../types/types';

type CardListProp = {
    cards: CardProps[];
}

function CardList({cards}: CardListProp) {
    /* const [hoveredCard, setHoveredCard] = useState(0); */

    const changeHoveredCard = (id: number): void => {
        console.log('id', id);
    };

    return (
        <div className="cities__places-list places__list tabs__content">
            {cards.map((card) => <Card key={card.id} card={card} changeHover={() => changeHoveredCard(card.id)} />)}
        </div>
    );
}

export default CardList;
