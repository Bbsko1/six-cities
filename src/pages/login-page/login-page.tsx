import { FormEvent, useRef } from 'react';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { Link, Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { loginAction } from '../../store/actions/card-actions';
import Logo from '../../components/logo/logo';

function LoginPage() {
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const {activeCity} = useTypedSelector(state => state.CITIES);
    const {authStatus} = useTypedSelector(state => state.USER);

    const dispatch = useAppDispatch();

    if (authStatus === AuthorizationStatus.Auth) {
        return <Navigate to={AppRoutes.Main} />
    }

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (loginRef.current !== null && passwordRef.current !== null) {
            dispatch(loginAction({
                email: loginRef.current.value,
                password: passwordRef.current.value
            }));
        }
    }

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
                        <h1 className="login__title">Sign in</h1>
                        <form onSubmit={handleSubmit} className="login__form form" action="#" method="post" >
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">E-mail</label>
                                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
                            </div>
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">Password</label>
                                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required />
                            </div>
                            <button className="login__submit form__submit button" type="submit">Sign in</button>
                        </form>
                    </section>
                    <section className="locations locations--login locations--current">
                        <div className="locations__item">
                            <Link className="locations__item-link" to={AppRoutes.Main}>
                                <span>{activeCity}</span>
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;
