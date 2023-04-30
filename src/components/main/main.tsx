/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { CardProps } from '../../types/types';
import CardList from '../card-list/card-list';
import Logo from '../logo/logo';
import Map from '../map/map';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchCards } from '../../store/actions/location-actions';
import type {} from 'redux-thunk/extend-redux';
import CityList from '../city-list/city-list';
import { sortingCards } from '../../utils/sorting-cards';
import SortingList from '../sorting-list/sorting-list';


function Main(): JSX.Element {
    const [activeCardId, setActiveCardId] = useState<number | undefined>(undefined);
    const state = useTypedSelector(state => state.CARDS);
    const {activeCity, cards, cities, error, loading, sortType} = state;
    const dispatch = useDispatch();
    const activeCityObj = cities.find(city => city.name === activeCity);

    useEffect(() => {
        dispatch(fetchCards());
    }, [])

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div>идет загрузка</div>;
    }

    if (!cards.length) {
        return <div>Элементы не найдены</div>;
    }

    let curCards = cards.filter(card => card.city.name === activeCity);
    curCards = sortingCards(curCards, sortType);
    
    return (
        <div className="page page--gray page--main">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo isActive />
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <a className="header__nav-link header__nav-link--profile" href="#">
                                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a className="header__nav-link" href="#">
                                        <span className="header__signout">Sign out</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--index">
                <h1 className="visually-hidden">Cities</h1>

                {cities.length && activeCity  && <CityList cities={cities} activeCity={activeCity} />}
                

                <div className="cities">
                    <div className="cities__places-container container">
                        <section className="cities__places places g-custom-scroll">
                            <h2 className="visually-hidden">Places</h2>
                            <b className="places__found">{curCards.length} places to stay in {activeCity}</b>
                            <SortingList />
                            <CardList cards={curCards} onSetActiveCard={setActiveCardId} />
                        </section>
                        <div className="cities__right-section">
                            <section className="cities__map map">
                                <Map cards={curCards} activeCardId={activeCardId} activeCity={activeCityObj ? activeCityObj : cities[0]} />
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Main;
