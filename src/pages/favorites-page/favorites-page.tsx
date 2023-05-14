import { useDispatch } from "react-redux";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { useEffect } from "react";
import { fetchCardList, fetchFavorites } from "../../store/actions/card-actions";
import { ThunkAppDispatch } from "../../types/card-actions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Favorites from "../../components/favorites/favorites";
import FavoritesEmpty from "../../components/favorites-empty/favorites-empty";


function FavoritesPage() {
    const dispatch = useDispatch();
    const {favorites} = useTypedSelector(state => state.CARDS);

    useEffect(() => {
        (dispatch as ThunkAppDispatch)(fetchFavorites());
    }, []);

    const hasFavorites = favorites.length ? true : false;
    
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
