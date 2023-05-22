import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';


type LogoProps = {
    isActive?: boolean;
}

function Logo({ isActive }: LogoProps) {
    return (
        <Link
            className={`header__logo-link ${isActive ? 'header__logo-link--active' : ''}`}
            to={AppRoutes.Main}
        >
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
        </Link>
    );
}

export default Logo;
