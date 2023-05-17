import { CardProps } from '../../types/types';
import { createFavoriteData } from '../../utils/create-favorite-data';
import FavoriteCity from '../favorite-city/favorite-city';

type FavoritesProps = {
    favoriteCards: CardProps[];
}

function Favorites({favoriteCards}: FavoritesProps) {
    const arFavoriteCities = createFavoriteData(favoriteCards);

    return (
        <div className="page__favorites-container container">
            <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                    {arFavoriteCities.map((arFavoriteCity) => <FavoriteCity key={arFavoriteCity.id} favoriteCity={arFavoriteCity} />)}

                </ul>
            </section>
        </div>
    );
}

export default Favorites;
