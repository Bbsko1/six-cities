import { useDispatch } from "react-redux";
import { CityProps } from "../../types/types";
import { changeActiveCity } from "../../store/actions/card-actions";

type CityItemProps = {
    city: CityProps,
    activeCity: string,
}

function CityItem({city, activeCity}: CityItemProps) {
    const dispatch = useDispatch();

    const changeCity = (newCity: string) => {
        dispatch(changeActiveCity(newCity));
    }

    return (
        <li className="locations__item">
            <a className={`locations__item-link tabs__item ${city.name === activeCity ? 'tabs__item--active' : ''}`} href="#" onClick={() => {changeCity(city.name)}}>
                <span>{city.name}</span>
            </a>
        </li>
    );
}

export default CityItem;