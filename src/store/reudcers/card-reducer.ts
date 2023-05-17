import { CardProps, CardsState, CommentsGet } from "../../types/types";
import { SortNames } from "../../const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    fetchCards,
    fetchFavorites,
    fetchToggleFavorite,
    getCommentsAction,
    getNearbyAction,
} from "../actions/card-actions";
import { toast } from "react-toastify";

const initialState: CardsState = {
    cards: [],
    loading: true,
    error: null,
    sortType: SortNames.Popular,
    nearby: [],
    hotelComments: [],
    favorites: [],
};
/* 
export const cardReducer = (state: CardsState = initialState, action: LocationActions): CardsState => {
    switch (action.type) {
        case ActionType.FetchCards:
            return {...state, loading: true};
        case ActionType.FetchCardsSuccess:
            return {...state, cards: action.payload, loading: false};
        case ActionType.FetchCardsError:
            return {...state, error: action.payload, loading: false};
        case ActionType.ChangeCardList:
            return {...state, cards: action.payload};
        case ActionType.ChangeSorting:
            return {...state, sortType: action.payload};
        case ActionType.ChangeNearbyCards:
            return {...state, nearby: action.payload};
        case ActionType.GetHotelComments:
            return {...state, hotelComments: action.payload};
        case ActionType.GetFavorites:
            return {...state, favorites: action.payload, loading: false};
        default:
            return state;
    }
} */

export const cardReducer = createSlice({
    name: "cards",
    initialState,
    reducers: {
        changeSorting(state, action: PayloadAction<SortNames>) {
            state.sortType = action.payload;
        },
    },
    /* extraReducers: {
        [fetchCards.pending.type]: (state) => {
            state.loading = true;
        },
        [fetchCards.fulfilled.type]: (state, action: PayloadAction<CardProps[]>) => {
            state.cards = action.payload;
            state.loading = false;
        },
        [fetchCards.rejected.type]: (state) => {
            state.cards = [];
            state.loading = false;
            toast.info('Something went wrong fetchCards');
        },
        [getNearbyAction.fulfilled.type]: (state, action: PayloadAction<CardProps[]>) => {
            state.nearby = action.payload;
        },
        [getNearbyAction.rejected.type]: (state) => {
            state.nearby = [];
        },
        [getCommentsAction.fulfilled.type]: (state, action: PayloadAction<CommentsGet[]>) => {
            state.hotelComments = action.payload;
        },
        [getCommentsAction.rejected.type]: (state) => {
            state.hotelComments = [];
        },
        [fetchFavorites.fulfilled.type]: (state, action: PayloadAction<CardProps[] | []>) => {
            state.favorites = action.payload;
        },
        [fetchFavorites.rejected.type]: (state) => {
            state.favorites = [];
        },
        [fetchToggleFavorite.fulfilled.type]: (state, action: PayloadAction<CardProps>) => {
            const cards = state.cards;
            const changedCard = action.payload;
            const indexCard = cards.findIndex(card => card.id === changedCard.id);

            if (indexCard !== -1) {
                cards.splice(indexCard, 1, changedCard);
                state.cards = cards;
            }
        },
    } */
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
                toast.info("Something went wrong fetchCards");
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
                    const indexCard = cards.findIndex(card => card.id === changedCard.id);

                    if (indexCard !== -1) {
                        cards.splice(indexCard, 1, changedCard);
                        state.cards = cards;
                    }
                }                
            })
    },
});
