import { Link } from "react-router-dom";
import Logo from "../logo/logo";
import { AppRoutes } from "../../const";

function NotFound() {
    return (
        <div className="page page--gray page--login">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo />
                        </div>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--login">
                <div className="page__login-container container">
                    <section className="login">
                        <h1 className="login__title">404 Page not found</h1>
                    </section>
                    <section className="locations locations--login locations--current">
                        <div className="locations__item">
                            <Link className="locations__item-link" to={AppRoutes.Main}>
                                <span>Amsterdam</span>
                            </Link >
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default NotFound;