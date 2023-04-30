import { Link } from 'react-router-dom';
import { CardProps } from '../../types/types';

type Props = {
    card: CardProps;
    mouseEnter: () => void;
}

function Card({ card, mouseEnter }: Props): JSX.Element {
    const ratingScore = `${card.rating * 20}%`;

    return (
        <article className="cities__place-card place-card" onMouseEnter={mouseEnter}>
            {card.isPremium &&
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>}
            <div className="cities__image-wrapper place-card__image-wrapper">
                <Link to={`offer/${card.id}`}>
                    <img className="place-card__image" src={card.previewImage} width="260" height="200" alt="Place" />
                </Link>
            </div>
            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{card.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className={`place-card__bookmark-button button ${card.active ? 'place-card__bookmark-button--active' : ''}`} type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: ratingScore }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`offer/${card.id}`}>{card.title}</Link>
                </h2>
                <p className="place-card__type">{card.type}</p>
            </div>
        </article>
    );
}

export default Card;
