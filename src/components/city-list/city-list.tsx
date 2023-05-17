import { CityProps } from '../../types/types';
import CityItem from '../city-item/city-item';

type CityListProps = {
    cities: CityProps[];
    activeCity: string;
}

function CityList({cities, activeCity} : CityListProps) {
    return (
        <div className="tabs">
            <section className="locations container">
                <ul className="locations__list tabs__list">
                    {cities.map((city) => <CityItem key={city.name} city={city} activeCity={activeCity} />)}
                </ul>
            </section>
        </div>
    );
}

export default CityList;
