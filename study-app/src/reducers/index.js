import {
    FETCHING_START,
    FETCHING_SUCCESS,
    FETCHING_FAILURE,
} from '../actions';

const initialState = {
    quizzes: [],
    fetching: false,
    error: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_START:
            return {
                ...state,
                fetching: true,
            };
        case FETCHING_SUCCESS:
            return {
                ...state,
                error: null,
                fetching: false,
                quizzes: action.payload
            };
        case FETCHING_FAILURE:
            return {
                ...state,
                error: action.payload,
                fetching: false,
            };
        default:
            return state;
    }
};