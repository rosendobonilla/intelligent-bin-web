import {
    SET_RANKING_USERS,
    SET_STATS_TRASH,
    SET_TOTALS_TRASH,
    SET_TRASH_HISTORY, SET_USER_RECYCLING
} from '../types';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_STATS_TRASH:
            return{
                ...state,
                trash: action.payload
            };
        case SET_TOTALS_TRASH:
            return{
                ...state,
                trashTotals: action.payload
            };
        case SET_TRASH_HISTORY:
            return{
                ...state,
                trashHistory: action.payload
            };
        case SET_RANKING_USERS:
            return {
                ...state,
                rankingUsers: action.payload
            };
        case SET_USER_RECYCLING:
            return {
                ...state,
                userRecycling: action.payload
            };
        default:
            return state;
    }
};