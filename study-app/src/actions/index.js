import axios from 'axios';

export const FETCHING_START = 'FETCHING_START';
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS';
export const FETCHING_FAILURE = 'FETCHING_FAILURE';

const baseUrl = 'https://lambda-study-app.herokuapp.com/';

export const fetchQuizzes = () => dispatch => {
    dispatch({ type: FETCHING_START });
    axios
        .get(baseUrl)
        .then(res => {
            console.log(res);
            dispatch({ type: FETCHING_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: FETCHING_FAILURE, payload: err });
        });
};