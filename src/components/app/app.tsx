import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../login/login';
import Property from '../property/property';
import Favorites from '../favorites/favorites';
import { AppRoutes, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import NotFound from '../404/404';
import MainPage from '../../pages/main-page/main-page';

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoutes.Main} element={<MainPage />} />
                <Route path={AppRoutes.Login} element={<Login />} />
                <Route path={AppRoutes.Favorites} element={<PrivateRoute><Favorites /></PrivateRoute>} />
                <Route path={AppRoutes.Room} element={<Property />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
