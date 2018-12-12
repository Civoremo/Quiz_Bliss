import {
    FETCHING_START,
    FETCHING_SUCCESS,
    FETCHING_FAILURE,
    ADD_QUIZ_START,
    ADD_QUIZ_SUCCESS,
    ADD_QUIZ_FAILURE,
    DELETE_QUIZ_START,
    DELETE_QUIZ_SUCCESS,
    DELETE_QUIZ_FAILURE,
    FETCH_TOPICS_START,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE,
    FETCH_QUESTIONS_START,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE,
} from '../actions';

const initialState = {
    quizzes: [],
    topics: [],
    questions: [],
    fetching: false,
    fetchingQuestions: false,
    fetchTopics: false,
    addingQuiz: false,
    fetchQuiz: false,
    deleteQuiz: false,
    error: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Fetching Questions Cases
        case FETCH_QUESTIONS_START:
            return {
                ...state,
                fetchingQuestions: true,
            };
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                error: null,
                questions: action.payload,
            };
        case FETCH_QUESTIONS_FAILURE:
            return {
                ...state,
                error: action.payload,
                fetchingQuestions: false,
            };

        // Topics Case
        case FETCH_TOPICS_START:
            return {
                ...state,
                fetchTopics: true,
            };
        case FETCH_TOPICS_SUCCESS:
            return {
                ...state,
                error: null,
                topics: action.payload,
            };
        case FETCH_TOPICS_FAILURE:
            return {
                ...state,
                error: action.payload,
                fetchTopics: false,
            };
        // Delete Quiz Cases
        case DELETE_QUIZ_START:
            return {
                ...state,
                deleteQuiz: true,
            };
        case DELETE_QUIZ_SUCCESS:
            return {
                ...state,
                error: null,
                deleteQuiz: false,
            };
        case DELETE_QUIZ_FAILURE:
            return {
                ...state,
                error: action.payload,
                deleteQuiz: false,
            };

        // Adding Cases
        case ADD_QUIZ_START:
            return {
                ...state,
                addingQuiz: true,
            };
        case ADD_QUIZ_SUCCESS:
            return {
                ...state,
                error: null,
                addingQuiz: false,
            };
        case ADD_QUIZ_FAILURE:
            return {
                ...state,
                error: action.payload,
                addingQuiz: false,
            };

        // Fetching Cases
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