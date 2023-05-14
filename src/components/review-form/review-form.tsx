import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { APIRoute } from "../../const";
import { BACKEND_URL, createAPI } from "../../services/api";
import { useDispatch } from "react-redux";
import { ThunkAppDispatch } from "../../types/card-actions";
import { getCommentsAction } from "../../store/actions/card-actions";

type ReviewFormProps = {
    hotelId: string,
}

const ratingNumbers = [5, 4, 3, 2, 1];

function ReviewForm({ hotelId }: ReviewFormProps) {
    const { id } = useParams();
    const [rating, setRating] = useState<null | number>(null);
    const [message, setMessage] = useState<null | string>(null);
    const [disabledForm, setDisabledForm] = useState<boolean>(true);
    const minMessageWords = 50;
    const maxMessageWords = 300;
    const dispatch = useDispatch();

    useEffect(() => {
        if (rating && message && message.length > minMessageWords && message.length <= maxMessageWords) {
            setDisabledForm(false);
        } else {
            setDisabledForm(true);
        }
    }, [rating, message]);

    const onStarsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.currentTarget.checked) {
            setRating(Number(evt.currentTarget.value));
        } else {
            setRating(null);
        }
    };

    const onMessageChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (evt.currentTarget.value) {
            setMessage(evt.currentTarget.value);
        } else {
            setMessage(null);
        }
    };

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const fetchLink = `${BACKEND_URL}${APIRoute.Comments}/${hotelId}`;
        const commentsLink = `/comments/${id}`;
        
        const reviewFormData = {
            rating: rating,
            comment: message,
        };

        const newApi = createAPI(() => {});

        try {
            await newApi.post(fetchLink, reviewFormData);

            (dispatch as ThunkAppDispatch)(getCommentsAction(commentsLink));
            setMessage(null);
            setRating(null);
        } catch (error) {
            
        }
    }

    return (
        <form className="reviews__form form" action="#"  method="post" onSubmit={onSubmit}>
            <label className="reviews__label form__label" htmlFor="review">Your review</label>
            <div className="reviews__rating-form form__rating">
                {ratingNumbers.map(number => {
                    return (
                        <React.Fragment key={number}>
                            <input className="form__rating-input visually-hidden" name="rating" value={number} id={`${number}-stars`} type="radio" onChange={onStarsChange} />
                            <label htmlFor={`${number}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                                <svg className="form__star-image" width="37" height="33">
                                    <use xlinkHref="#icon-star"></use>
                                </svg>
                            </label>
                        </React.Fragment>
                    );
                })}
            </div>
            <textarea className="reviews__textarea form__textarea" onChange={onMessageChange} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={message ? message : ''}></textarea>
            <div className="reviews__button-wrapper">
                <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                </p>
                <button className="reviews__submit form__submit button" disabled={disabledForm} type="submit">Submit</button>
            </div>
        </form>
    );
}

export default ReviewForm;