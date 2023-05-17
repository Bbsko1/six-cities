import { SortNames } from '../../const';

type SortingItemProps = {
    name: string;
    isActive: boolean;
    clickHandler: () => void;
}

function SortingItem({ name, isActive, clickHandler }: SortingItemProps) {
    return (
        <li className={`places__option ${isActive && 'places__option--active'}`} tabIndex={0} onClick={clickHandler}>
            {name}
        </li>
    );
}

export default SortingItem;
