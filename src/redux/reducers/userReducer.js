import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    UNLIKE_PROJECT,
    LIKE_PROJECT,
    MARK_NOTIFICATIONS_READ,
} from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };

        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_PROJECT:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        projectId: action.payload.projectId
                    }
                ]
            };
        case UNLIKE_PROJECT:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.projectId !== action.payload.projectId
                )
            };
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach((not) => (
                not.read = true
                )
            );
            return {
                ...state
            };
        default:
            return state;
    }
}