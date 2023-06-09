import { NavLink } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import Logo from '../logo/logo';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { logoutAction } from '../../store/actions/card-actions';

function Header() {
    const { authStatus, userData } = useTypedSelector((state) => state.USER);
    const dispatch = useAppDispatch();

    const handleLogOut = (): void => {
        dispatch(logoutAction());
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo isActive />
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            {authStatus === AuthorizationStatus.Auth && userData !== null &&
                                <li className="header__nav-item user">
                                    <NavLink className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
                                        <div className="header__avatar-wrapper user__avatar-wrapper" style={{
                                            backgroundImage: `url(${userData.avatarUrl})`,
                                            borderRadius: '50%',
                                        }}
                                        >
                                        </div>
                                        <span className="header__user-name user__name">{userData.email}</span>
                                    </NavLink>
                                </li>}

                            <li className="header__nav-item">
                                {authStatus === AuthorizationStatus.Auth ?
                                    <a className="header__nav-link" href='#' onClick={handleLogOut}>
                                        <span className="header__signout">Sign out</span>
                                    </a>
                                    :
                                    <NavLink className="header__nav-link" to={AppRoutes.Login}>
                                        <span className="header__signout">Sign in</span>
                                    </NavLink>}

                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
