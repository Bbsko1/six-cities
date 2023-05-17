import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../const';
import PrivateRoute from '../private-route/private-route';
import NotFound from '../404/404';
import MainPage from '../../pages/main-page/main-page';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import CardDetailPage from '../../pages/card-detail-page/card-detail-page';

function App(): JSX.Element {
    const loading = useTypedSelector((state) => state.CARDS.loading);

    if (loading) {
        return (
            <div>
                Идет загрузка
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoutes.Main} element={<MainPage />} />
                <Route path={AppRoutes.Login} element={<LoginPage />} />
                <Route path={AppRoutes.Favorites} element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
                <Route path={AppRoutes.Room} element={<CardDetailPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
