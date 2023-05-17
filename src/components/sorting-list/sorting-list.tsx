import { useState } from 'react';
import { SortNames, sortingList } from '../../const';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import SortingItem from '../sorting-item/sorting-item';
import { cardReducer } from '../../store/reudcers/card-reducer';

function SortingList() {
    const [opened, setOpened] = useState(false);
    const curSort: SortNames = useTypedSelector((state) => state.CARDS.sortType);
    const dispatch = useAppDispatch();
    const sortName = sortingList.find((item) => item.value === curSort)?.name;
    const changeSorting = cardReducer.actions.changeSorting;

    const bindSortItem = (sortValue: SortNames) => {
        dispatch(changeSorting(sortValue));
        toggleOpen();
    };

    const toggleOpen = () => {
        setOpened(!opened);
    };

    return (
        <form className="places__sorting" action="#" method="get" onClick={toggleOpen}>
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
                {sortName}
                <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                </svg>
            </span>
            <ul className={`places__options places__options--custom ${opened ? 'places__options--opened' : ''}`}>
                {sortingList.map((sortItem) => <SortingItem key={sortItem.value} name={sortItem.name} isActive={sortItem.name === sortName} clickHandler={() => {bindSortItem(sortItem.value);}} />)}
            </ul>
        </form>
    );
}

export default SortingList;
