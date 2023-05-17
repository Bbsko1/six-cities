import { CityProps } from "../../types/types";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { cityReducer } from "../../store/reudcers/city-reducer";

type CityItemProps = {
    city: CityProps,
    activeCity: string,
}

function CityItem({city, activeCity}: CityItemProps) {
    const dispatch = useAppDispatch();
    const changeActiveCity = cityReducer.actions.changeActiveCity;

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