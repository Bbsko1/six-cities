import { useState } from 'react';
import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import type {} from 'redux-thunk/extend-redux';
import CityList from '../../components/city-list/city-list';
import { sortingCards } from '../../utils/sorting-cards';
import SortingList from '../../components/sorting-list/sorting-list';
import Header from '../../components/header/header';
import MainEpty from '../../components/main-epty/main-epty';

function MainPage() {
    const [activeCardId, setActiveCardId] = useState<number | undefined>(undefined);
    const state = useTypedSelector(state => state.CARDS);
    const { activeCity, cards, cities, error, sortType } = state;
    const activeCityObj = cities.find(city => city.name === activeCity);

    if (error) {
        return <div>{error}</div>;
    }

    if (!cards.length) {
        return <MainEpty />;
    }

    let curCards = cards.filter(card => card.city.name === activeCity);
    curCards = sortingCards(curCards, sortType);

    return (
        <div className="page page--gray page--main">
            <Header />

            <main className="page__main page__main--index">
                <h1 className="visually-hidden">Cities</h1>

                {cities.length && activeCity && <CityList cities={cities} activeCity={activeCity} />}

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

export default MainPage;