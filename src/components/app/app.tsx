import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../main/main';
import Login from '../login/login';
import Property from '../property/property';
import Favorites from '../favorites/favorites';
import Header from '../header/header';
import { AppRoutes, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import NotFound from '../404/404';


function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoutes.Main} element={<Main />} />
                <Route path={AppRoutes.Login} element={<Login />} />
                <Route path={AppRoutes.Favorites} element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><Favorites /></PrivateRoute>} />
                <Route path={AppRoutes.Room} element={<Property />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
