import { CommentsGet } from "../../types/types";
import ReviewItem from "../review-item/review-item";

type ReviewsListProps = {
    reviews: CommentsGet[],
}

function ReviewsList({reviews}: ReviewsListProps) {
    return (
        <ul className="reviews__list">
            {reviews.map(review => <ReviewItem key={review.id} review={review} />)}
        </ul>
    );
}

export default ReviewsList;