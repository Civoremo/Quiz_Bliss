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
    EDIT_QUIZINFO_START,
    EDIT_QUIZINFO_SUCCESS,
    EDIT_QUIZINFO_FAILURE,
    ADD_QUESTION_START,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILURE,
    DELETE_QUESTION_START,
    DELETE_QUESTION_SUCCESS,
    DELETE_QUESTION_FAILURE,
    EDIT_QUESTION_START,
    EDIT_QUESTION_SUCCESS,
    EDIT_QUESTION_FAILURE,
    FETCH_QUIZ_START,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_FAILURE,
} from '../actions';

const initialState = {
    quizzes: [],
    topics: [],
    questions: [],
    currentQuiz: [],
    fetching: false,
    fetchingQuestions: false,
    fetchTopics: false,
    addingQuiz: false,
    fetchQuiz: false,
    deleteQuiz: false,
    deletingQuestion: false,
    editingQuestion: false,
    editingQuiz: false,
    addingQuestion: false,
    error: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Fetch Quiz Cases
        case FETCH_QUIZ_START:
            return {
                ...state,
                fetchQuiz:true,
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                fetchQuiz: false,
                currentQuiz: action.payload,
            };
        case FETCH_QUIZ_FAILURE:
            return {
                ...state,
                error: action.payload,
                fetchQuiz: false,
            };

        // Edit Question Cases
        case EDIT_QUESTION_START:
            return {
                ...state,
                editingQuestion: true,
            };
        case EDIT_QUESTION_SUCCESS:
            return {
                ...state,
                error: null,
                editingQuestion: false,
            };
        case EDIT_QUESTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                editingQuestion: false,
            };

        // Deleting Question Cases
        case DELETE_QUESTION_START:
            return {
                ...state,
                deletingQuestion: true,
            };
        case DELETE_QUESTION_SUCCESS:
            return {
                ...state,
                error: null,
                deletingQuestion: false,
            };
        case DELETE_QUESTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                deletingQuestion: false,
            };

        // Adding Question Cases
        case ADD_QUESTION_START:
            return {
                ...state,
                addingQuestion: true,
            };
        case ADD_QUESTION_SUCCESS:
            return {
                ...state,
                error: null,
                addingQuestion: false,
            };
        case ADD_QUESTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                addingQuestion: false,
            };

        // Editing Quiz Cases
        case EDIT_QUIZINFO_START:
            return {
                ...state,
                editingQuiz: true,
            };
        case EDIT_QUIZINFO_SUCCESS:
            return {
                ...state,
                error: null,
                editingQuiz: false,
            };
        case EDIT_QUIZINFO_FAILURE:
            return {
                ...state,
                error: action.payload,
                editingQuiz: false,
            };

        // Fetching Questions Cases
        case FETCH_QUESTIONS_START:
            return {
                ...state,
                fetchingQuestions: true,
            };
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                fetchingQuestions: false,
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