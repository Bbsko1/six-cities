import { CardProps } from '../../types/types';
import Card from '../card/card';

type NearbyListProps = {
    nearby: CardProps[];
}

function NearbyList({ nearby }: NearbyListProps) {
    return (
        <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
                {nearby.map((near) => <Card key={near.id} card={near} isNearby />)}
            </div>
        </section>
    );
}

export default NearbyList;
