import axios from 'axios';

export const FETCHING_START = 'FETCHING_START';
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS';
export const FETCHING_FAILURE = 'FETCHING_FAILURE';

export const ADD_QUIZ_START = 'ADD_QUIZ_START';
export const ADD_QUIZ_SUCCESS = 'ADD_QUIZ_SUCCESS';
export const ADD_QUIZ_FAILURE = 'ADD_QUIZ-FAILURE';

export const DELETE_QUIZ_START = 'DELETE_QUIZ_START';
export const DELETE_QUIZ_SUCCESS ='DELETE_QUIZ_SUCCESS';
export const DELETE_QUIZ_FAILURE = 'DELETE_QUIZ_FAILURE';

export const FETCH_TOPICS_START = "FETCH_TOPICS_START";
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';

export const FETCH_QUESTIONS_START = 'FETCH_QUESTIONS_START';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';

export const EDIT_QUIZINFO_START = 'EDIT_QUIZINFO_START';
export const EDIT_QUIZINFO_SUCCESS = 'EDIT_QUIZINFO_SUCCESS';
export const EDIT_QUIZINFO_FAILURE = ' EDIT_QUIZINFO_FAILURE';

export const ADD_QUESTION_START = 'ADD_QUESTION_START';
export const ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS';
export const ADD_QUESTION_FAILURE = 'ADD_QUESTION_FAILURE';

export const DELETE_QUESTION_START = 'DELETE_QUESTION_START';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_FAILURE = 'DELETE_QUESTION_FAILURE';

export const EDIT_QUESTION_START = 'EDIT_QUESTION_START';
export const EDIT_QUESTION_SUCCESS = 'EDIT_QUESTION_SUCCESS';
export const EDIT_QUESTION_FAILURE = 'EDIT_QUESTION_FAILURE';

export const FETCH_QUIZ_START = 'FETCH_QUIZ_START';
export const FETCH_QUIZ_SUCCESS ='FETCH_QUIZ_SUCCESS';
export const FETCH_QUIZ_FAILURE ='FETCH_QUIZ_FAILURE';

export const UPDATE_QUIZUSER_RELATION_START = 'UPDATE_QUIZUSER_RELATION_START';
export const UPDATE_QUIZUSER_RELATION_SUCCESS = 'UPDATE_QUIZUSER_RELATION_SUCCESS';
export const UPDATE_QUIZUSER_RELATION_FAILURE = 'UPDATE_QUIZUSER_RELATION_FAILURE';


const baseUrl = 'https://lambda-study-app.herokuapp.com/';


export const updateQuizUserRelation = (quizId, vote, favBool, score) => dispatch => {
    if(localStorage.getItem('userToken') !== 'guest') {
    dispatch({ type: UPDATE_QUIZUSER_RELATION_START });
    console.log(quizId + vote + favBool + score);
        axios({
                method: 'patch',
                url: `${baseUrl}api/quizzes/${quizId}`,
                data: {
                    vote: vote,
                    favorite: favBool,
                    score: score,
                },
                
                headers: {
                    Authorization: localStorage.getItem('userToken'),
                }
            })
            .then(res => {
                dispatch({ type: UPDATE_QUIZUSER_RELATION_SUCCESS });
            })
            .catch(err => {
                dispatch({ type: UPDATE_QUIZUSER_RELATION_FAILURE, payload: err });
            });
    }
};

export const fetchQuiz = (quizId) => dispatch => {
    if(localStorage.getItem('userToken') === 'guest') {
    dispatch({ type: FETCH_QUIZ_START });
        axios({
            method: 'get',
            url: `${baseUrl}api/quizzes/${quizId}`,
        })
        .then(res => {
            dispatch({ type: FETCH_QUIZ_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCH_QUIZ_FAILURE, payload: err });
        });
    } 
    else {
        axios({
                method: 'get',
                url: `${baseUrl}api/quizzes/${quizId}`,
                
                headers: {
                    Authorization: localStorage.getItem('userToken'),
                }
            })
            .then(res => {
                dispatch({ type: FETCH_QUIZ_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCH_QUIZ_FAILURE, payload: err });
            });
    }
};

export const editQuestion = (quizId, questionId, question, ans1, ans2, ans3, ans4, correctAns) => dispatch => {
    dispatch({ type: EDIT_QUESTION_START });
    axios({
            method: 'patch',
            url: `${baseUrl}api/quizzes/${quizId}/questions/${questionId}`,
            data: {
                question: question,
                option1: ans1,
                option2: ans2,
                option3: ans3,
                option4: ans4,
                answer: correctAns,
            },

            headers: {
                Authorization: localStorage.getItem('userToken'),
            }
        })
        .then(res => {
            dispatch({ type: EDIT_QUESTION_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: EDIT_QUESTION_FAILURE, payload: err });
        });
};

export const deleteQuestion = (quizId, questionId) => dispatch => {
    dispatch({ type: DELETE_QUESTION_START });
    axios({
            method: 'delete',
            url: `${baseUrl}api/quizzes/${quizId}/questions/${questionId}`,
            data: {
                quizId: quizId,
                questionId: questionId,
            },

            headers: {
                Authorization: localStorage.getItem('userToken'),
            }
        })
        .then(res => {
            dispatch({ type: DELETE_QUESTION_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: DELETE_QUESTION_FAILURE, payload: err });
        });
};

export const addQuestion = (id, question, ans1, ans2, ans3, ans4, correctAns) => dispatch => {
    dispatch({ type: ADD_QUESTION_START });
    axios({
        method: 'post',
        url: `${baseUrl}api/quizzes/${id}/questions`,

        data: {
            question: question,
            option1: ans1,
            option2: ans2,
            option3: ans3,
            option4: ans4,
            answer: parseInt(correctAns),
        },

        headers: {
            Authorization: localStorage.getItem('userToken'),
        }
    })
    .then(res => {
        dispatch({ type: ADD_QUESTION_SUCCESS });
    })
    .catch(err => {
        dispatch({ type: ADD_QUESTION_FAILURE, payload: err });
    });

};

export const editQuizInfo = (id, newTitle, newTopic, newDescrip, newTime) => dispatch => {
    dispatch({ type: EDIT_QUIZINFO_START });
    axios({
            method: 'patch',
            url: `${baseUrl}api/quizzes/${id}/edit`,
            data: {
                title: newTitle,
                topic: newTopic,
                description: newDescrip,
                time_limit_seconds: newTime,
            },

            headers: {
                Authorization: localStorage.getItem('userToken'),
            }
        })
        .then(res => {
            dispatch({ type: EDIT_QUIZINFO_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: EDIT_QUIZINFO_FAILURE, payload: err });
        });
};

export const fetchQuizzes = () => dispatch => {
    dispatch({ type: FETCHING_START });
    axios
        .get(`${baseUrl}api/quizzes`)
        .then(res => {
            dispatch({ type: FETCHING_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCHING_FAILURE, payload: err });
        });
};

export const fetchQuestions = id => dispatch => {
    dispatch({ type: FETCH_QUESTIONS_START });
    axios
        .get(`${baseUrl}api/quizzes/${id}/questions`)
        .then(res => {
            dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCH_QUESTIONS_FAILURE, payload: err });
        });
};

export const fetchTopics = () => dispatch => {
    dispatch({ type: FETCH_TOPICS_START });
    axios
        .get(`${baseUrl}api/quizzes/topics`)
        .then(res => {
            dispatch({ type: FETCH_TOPICS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCH_TOPICS_FAILURE, payload: err });
        });
};

export const deleteQuiz = (quizId, token) => dispatch => {
    dispatch({ type: DELETE_QUIZ_START });
    axios({
            method: 'delete',
            url: `${baseUrl}api/quizzes/${quizId}`,

            headers: {
                Authorization: token
            }
        })
        .then(res => {
            dispatch({ type: DELETE_QUIZ_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: DELETE_QUIZ_FAILURE, payload: err});
        });
};

export const addNewQuiz = (quizTitle, quizTopic, descrip, time, token) => dispatch => {
    dispatch({ type: ADD_QUIZ_START });
    axios({
            method: 'post',
            url: `${baseUrl}api/quizzes`,
            data: {
                title: quizTitle,
                topic: quizTopic,
                description: descrip,
                time_limit_seconds: time,
            },
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            dispatch({ type: ADD_QUIZ_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: ADD_QUIZ_FAILURE, payload: err });
        });
};