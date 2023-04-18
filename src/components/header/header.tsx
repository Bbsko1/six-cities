import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../const';

function Header() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={AppRoutes.Main}>
                        Главная
                    </NavLink>
                </li>
                <li>
                    <NavLink to={AppRoutes.Login}>
                        Авторизация
                    </NavLink>
                </li>
                <li>
                    <NavLink to={AppRoutes.Favorites}>
                        Избранное
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/offer/3">
                        Комнаты
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
