import { AppRoutes, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type PrivateRouteProps = {
    children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
    const { children } = props;
    const authorizationStatus = useTypedSelector((state) => state.USER.authStatus);

    return (
        authorizationStatus === AuthorizationStatus.Auth
            ? children
            : <Navigate to={AppRoutes.Login} />
    );
}

export default PrivateRoute;
