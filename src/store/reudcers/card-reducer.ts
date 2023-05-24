import { CardsState } from '../../types/types';
import { SortNames } from '../../const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    fetchCards,
    fetchFavorites,
    fetchToggleFavorite,
    getCommentsAction,
    getNearbyAction,
    postCommentsAction,
} from '../actions/card-actions';
import { toast } from 'react-toastify';

const initialState: CardsState = {
    cards: [],
    loading: true,
    error: null,
    sortType: SortNames.Popular,
    nearby: [],
    hotelComments: [],
    favorites: [],
    activeCard: null,
};

export const cardReducer = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        changeSorting(state, action: PayloadAction<SortNames>) {
            state.sortType = action.payload;
        },
        changeActiveCard(state, action: PayloadAction<number | null>) {
            state.activeCard = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.cards = action.payload;
                state.loading = false;
            })
            .addCase(fetchCards.rejected, (state) => {
                state.cards = [];
                state.loading = false;
                toast.info('Something went wrong fetchCards');
            })
            .addCase(getNearbyAction.fulfilled, (state, action) => {
                state.nearby = action.payload;
            })
            .addCase(getNearbyAction.rejected, (state) => {
                state.nearby = [];
            })
            .addCase(getCommentsAction.fulfilled, (state, action) => {
                state.hotelComments = action.payload;
            })
            .addCase(getCommentsAction.rejected, (state) => {
                state.hotelComments = [];
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state) => {
                state.favorites = [];
            })
            .addCase(fetchToggleFavorite.fulfilled, (state, action) => {
                const cards = state.cards;
                const changedCard = action.payload;

                if (changedCard) {
                    const indexCard = cards.findIndex((card) => card.id === changedCard.id);

                    if (indexCard !== -1) {
                        cards.splice(indexCard, 1, changedCard);
                        state.cards = cards;
                    }
                }
            })
            .addCase(postCommentsAction.fulfilled, (state, action) => {
                state.hotelComments = action.payload;
            });
    },
});
