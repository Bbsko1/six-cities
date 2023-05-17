import { Link } from 'react-router-dom';
import { CardProps } from '../../types/types';
import FavoriteButton from '../favorite-button/favorite-button';

type FavoriteCardProps = {
    favoriteCard: CardProps;
}

function FavoriteCard({ favoriteCard }: FavoriteCardProps) {
    const ratingScore = `${favoriteCard.rating * 20}%`;
    const cardDetailLink = `/offer/${favoriteCard.id}`;

    return (
        <article className="favorites__card place-card">
            <div className="favorites__image-wrapper place-card__image-wrapper">
                <Link to={cardDetailLink}>
                    <img className="place-card__image" src={favoriteCard.previewImage} width="150" height="110" alt="Place image" />
                </Link>
            </div>
            <div className="favorites__card-info place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{favoriteCard.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <FavoriteButton isActive={favoriteCard.isFavorite} cardId={favoriteCard.id} isFavoritePage />
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: ratingScore }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={cardDetailLink}>{favoriteCard.title}</Link>
                </h2>
                <p className="place-card__type">{favoriteCard.type}</p>
            </div>
        </article>
    );
}

export default FavoriteCard;
