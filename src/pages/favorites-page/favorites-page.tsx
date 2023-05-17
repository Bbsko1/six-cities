import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useEffect } from 'react';
import { fetchFavorites } from '../../store/actions/card-actions';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import Favorites from '../../components/favorites/favorites';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';


function FavoritesPage() {
    const dispatch = useAppDispatch();
    const {favorites} = useTypedSelector((state) => state.CARDS);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, []);

    const hasFavorites = !!favorites.length;

    return (
        <div className={`page ${!hasFavorites && 'page--favorites-empty'}`}>
            <Header />

            <main className={`page__main page__main--favorites ${!hasFavorites && 'page__main--favorites-empty'}`}>
                {hasFavorites ? <Favorites favoriteCards={favorites}/> : <FavoritesEmpty />}
            </main>
            <Footer />
        </div>
    );
}

export default FavoritesPage;
