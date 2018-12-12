import React from 'react';
import { connect } from 'react-redux';
import { deleteQuiz } from '../actions';
import axios from 'axios';
import '../styles/ViewQuizCard.css';

import QuestionsList from './QuestionsList';

const baseUrl = 'https://lambda-study-app.herokuapp.com/';

class ViewQuizCard extends React.Component {
    constructor() {
        super();
        this.state = {
            quiz: {},
            author: {}
        }
    }

    componentDidMount() {
        this.getQuiz();

    }

    getQuiz = () => {
        axios
            .get(`${baseUrl}api/quizzes/${this.props.match.params.quizId}`)
            .then(res => {
                console.log(res);
                this.setState({
                    quiz: res.data,
                    author: res.data.author
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteQuiz = e => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');
        this.props.deleteQuiz(this.props.match.params.quizId, token);
        this.props.history.push('/');
    }

    render () {
        if(this.state.quiz.length === 0) {
            return <></>
        }
        console.log(this.state.author.img_url);
        return (
            <div className='viewQuiz-container'>
                <div>
                    <span onClick={this.deleteQuiz}>delete</span>
                </div>
                <div>
                    <div>
                        {/* {place for profile image} */}
                    </div>
                    <div>
                        <div>Title: {this.state.quiz.title}</div>
                        <div>Topic: {this.state.quiz.topic}</div>
                        <div>Author: {this.state.author.username}</div>
                    </div>
                    <div><QuestionsList quizId={this.props.match.params.quizId}/></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        fetchQuiz: state.fetchQuiz,
        deleteQuiz: state.deleteQuiz,
        questions: state.questions,
    };
}

export default connect(
    mapStateToProps,
    { deleteQuiz }
)(ViewQuizCard);