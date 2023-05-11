import { useParams, Navigate, Link } from 'react-router-dom';
import { CardProps } from '../../types/types';
import { APIRoute, AppRoutes, AuthorizationStatus } from '../../const';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Header from '../../components/header/header';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import { useEffect } from 'react';
import { getNearbyAction, getCommentsAction } from '../../store/actions/card-actions';
import { useDispatch } from 'react-redux';
import { ThunkAppDispatch } from '../../types/card-actions';
import NearbyList from '../../components/nearby-list/nearby-list';
import ReviewsList from '../../components/reviews-list/reviews-list';


function CardDetailPage() {
    const { id } = useParams();
    const { cards, authStatus } = useTypedSelector(state => state.CARDS);

    const currentCard: CardProps | undefined = cards.find((card) => card.id === Number(id));

    if (!currentCard) {
        return <Navigate to={AppRoutes.NotFound} />;
    }

    const dispatch = useDispatch();
    const { nearby, hotelComments } = useTypedSelector(state => state.CARDS)

    useEffect(() => {
        const nearbyLink = `${APIRoute.Hotels}/${id}/nearby`;
        const commentsLink = `/comments/${id}`;

        (dispatch as ThunkAppDispatch)(getNearbyAction(nearbyLink));
        (dispatch as ThunkAppDispatch)(getCommentsAction(commentsLink));
    }, [id]);

    return (
        <div className="page">
            <Header />

            <main className="page__main page__main--property">
                <section className="property">
                    <div className="property__gallery-container container">
                        <div className="property__gallery">
                            {currentCard.images.map(imageSrc => {
                                return (
                                    <div key={imageSrc} className="property__image-wrapper">
                                        <img className="property__image" src={imageSrc} alt="Studio" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="property__container container">
                        <div className="property__wrapper">
                            {currentCard.isPremium &&
                                <div className="property__mark">
                                    <span>Premium</span>
                                </div>}
                            <div className="property__name-wrapper">
                                <h1 className="property__name">
                                    {currentCard.title}
                                </h1>
                                <button className="property__bookmark-button button" type="button">
                                    <svg className="property__bookmark-icon" width="31" height="33">
                                        <use xlinkHref="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">To bookmarks</span>
                                </button>
                            </div>
                            <div className="property__rating rating">
                                <div className="property__stars rating__stars">
                                    <span style={{ width: `${currentCard.rating * 20}%` }}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="property__rating-value rating__value">{currentCard.rating}</span>
                            </div>
                            <ul className="property__features">
                                <li className="property__feature property__feature--entire">
                                    {currentCard.type}
                                </li>
                                <li className="property__feature property__feature--bedrooms">
                                    {currentCard.bedrooms} Bedrooms
                                </li>
                                <li className="property__feature property__feature--adults">
                                    Max {currentCard.maxAdults} adults
                                </li>
                            </ul>
                            <div className="property__price">
                                <b className="property__price-value">&euro;{currentCard.price}</b>
                                <span className="property__price-text">&nbsp;night</span>
                            </div>
                            <div className="property__inside">
                                <h2 className="property__inside-title">What&apos;s inside</h2>
                                <ul className="property__inside-list">
                                    {currentCard.goods.map(good => (
                                        <li className="property__inside-item" key={good}>
                                            {good}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="property__host">
                                <h2 className="property__host-title">Meet the host</h2>
                                <div className="property__host-user user">
                                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                                        <img className="property__avatar user__avatar" src={currentCard.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                                    </div>
                                    <span className="property__user-name">
                                        {currentCard.host.name}
                                    </span>

                                    {currentCard.host.isPro && (
                                        <span className="property__user-status">
                                            Pro
                                        </span>
                                    )}
                                </div>
                                <div className="property__description">
                                    <p className="property__text">
                                        {currentCard.description}
                                    </p>
                                </div>
                            </div>
                            <section className="property__reviews reviews">
                                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{hotelComments.length}</span></h2>
                                {
                                    hotelComments.length !== 0 ?
                                        <ReviewsList reviews={hotelComments} />
                                        : (`There are currently no reviews for this property, but you can ` + (authStatus !== AuthorizationStatus.Auth ? `authorize and ` : '') + `leave your own.`)
                                }


                                {authStatus === AuthorizationStatus.Auth && id && <ReviewForm hotelId={id} />}
                            </section>
                        </div>
                    </div>
                    <section className="property__map map">
                        <Map location={currentCard.location} cards={[currentCard]} />
                    </section>
                </section>
                {nearby.length &&
                    (
                        <div className="container">
                            <NearbyList nearby={nearby} />
                        </div>
                    )
                }
            </main>
        </div>
    );
}

export default CardDetailPage;