import { APIRoute, AppRoutes, AuthorizationStatus } from '../../const';
import { fetchToggleFavorite, fetchFavorites, getNearbyAction } from '../../store/actions/card-actions';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector';

type FavoriteButtonProps = {
    isActive: boolean;
    cardId: number;
    isDetail?: boolean;
    isFavoritePage?: boolean;
    isNearby?: boolean;
}

function FavoriteButton({ isActive, cardId, isFavoritePage, isDetail, isNearby }: FavoriteButtonProps) {
    const dispatch = useAppDispatch();
    const { authStatus } = useTypedSelector((state) => state.USER);
    let favLink = `${APIRoute.Favorite}/${cardId}/`;
    const svtWidth = isDetail ? 31 : 18;
    const svgHeight = isDetail ? 33 : 19;
    const { id } = useParams();
    const navigate = useNavigate();

    const toggleFavorite = () => {
        (async () => {
            if (isActive) {
                favLink += 0;
            } else {
                favLink += 1;
            }

            await dispatch(fetchToggleFavorite(favLink));

            if (authStatus !== AuthorizationStatus.Auth) {
                navigate(AppRoutes.Login);
                return;
            }

            if (isFavoritePage) {
                dispatch(fetchFavorites());
            }

            if (isNearby && id) {
                const nearbyLink = `${APIRoute.Hotels}/${id}/nearby`;
                dispatch(getNearbyAction(nearbyLink));
            }
        })();
    };

    return (
        <button className={`button ${isDetail ? 'property__bookmark-button' : 'place-card__bookmark-button'} ${isActive ? 'place-card__bookmark-button--active' : ''}`} onClick={toggleFavorite} type="button">
            <svg className="place-card__bookmark-icon" width={svtWidth} height={svgHeight}>
                <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{!isActive ? 'To bookmarks' : 'Delete from bookmarks'}</span>
        </button>
    );
}

export default FavoriteButton;
