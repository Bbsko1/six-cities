import { Link } from "react-router-dom";
import { FavoriteProps } from "../../types/types";
import FavoriteCard from "../favorite-card/favorite-card";
import { AppRoutes } from "../../const";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { changeActiveCity } from "../../store/actions/card-actions";

type FavoriteCityProps = {
    favoriteCity: FavoriteProps,
}

function FavoriteCity({favoriteCity}: FavoriteCityProps) {
    const {activeCity} = useTypedSelector(state => state.CITIES);
    const dispatch = useDispatch();

    const handleChangeCity = (): void => {
        if (favoriteCity.cityName !== activeCity) {
            dispatch(changeActiveCity(favoriteCity.cityName));
        }
    }

    return (
        <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoutes.Main} onClick={() => {handleChangeCity()}}>
                        <span>{favoriteCity.cityName}</span>
                    </Link>
                </div>
            </div>
            <div className="favorites__places">
                {favoriteCity.cards.map(card => <FavoriteCard key={card.id} favoriteCard={card} />)}
            </div>
        </li>
    );
}

export default FavoriteCity;