import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteQuiz, fetchQuiz } from '../actions';
import axios from 'axios';
import '../styles/ViewQuizCard.css';

import QuestionsList from './QuestionsList';
import EditQuiz from './EditQuiz';

const baseUrl = 'https://lambda-study-app.herokuapp.com/';

class ViewQuizCard extends React.Component {
    constructor() {
        super();
        this.state = {
            displayModal: false,
            displayEditForm: false,
        }
    }

    componentDidMount() {
        // this.getQuiz();
        this.props.fetchQuiz(this.props.match.params.quizId);

    }

    deleteQuiz = e => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');
        this.props.deleteQuiz(this.props.match.params.quizId, token);
        this.props.history.push('/');
    }

    deleteModal = e => {
        e.preventDefault();
        this.setState({
            displayModal: !this.state.displayModal,
        });
    }

    editQuizForm = e => {
        e.preventDefault();
        this.setState({
            displayEditForm: !this.state.displayEditForm,
        });
    }

    render () {
        if(this.props.quizData.length === 0) {
            return <></>
        }
        return (
            <div className='viewQuiz-container'>
                <div>
                    <div className='quiz-info-container'>
                        <div className='quiz-delete-btn'>
                            <span className='entireQuiz-editQuizBtn' onClick={this.editQuizForm}>{this.state.displayEditForm ? 'cancel edit' :'edit quiz'}</span>
                            <Link to={`/addQuestion/${this.props.match.params.quizId}`} className='entireQuiz-editQuestionsBtn'>edit questions</Link>
                            <span className='entireQuiz-deleteBtn' onClick={this.deleteModal}>delete quiz</span>
                            <div className={this.state.displayModal ? 'deleteModal' : 'hideModal'}>
                                <div className='deleteModal-content'>
                                    <h3 className='deleteModal-text'>Do you really wish to delete this Quiz?</h3>
                                    <div className='deleteModal-btn-container'>
                                        <button className='deleteModal-btn red' onClick={this.deleteQuiz}>Delete</button>
                                        <button className='deleteModal-btn blue' onClick={this.deleteModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='quiz-author-info-container'>
                            <div>
                                <img src={this.props.quizData.author.img_url === null ? "https://bit.ly/2C9tLJe" : `${this.props.quizData.author.img_url}`} alt="profile" className='quiz-profile-image'/>
                            </div>
                            <div>
                                <div className='quizView-info'>Title: <span className='quizView-text'>{this.props.quizData.title}</span></div>
                                <div className='quizView-info'>Topic: <span className='quizView-text'>{this.props.quizData.topic}</span></div>
                                <div className='quizView-info'>Author: <span className='quizView-text'>{this.props.quizData.author.username}</span></div>
                                <div className='quizView-info'>Votes: <span className='quizView-text'>{this.props.quizData.votes}</span></div>
                            </div>
                            <div>
                                <div>upVote</div>
                                <div>downVote</div>
                            </div>
                            <div>
                                <div>
                                    Your Quiz Score:
                                </div>
                                <div>
                                    A+
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.displayEditForm ? 'editQuizForm' : 'showEditQuizForm'}>
                        <EditQuiz quizId={this.props.match.params.quizId} />
                    </div>
                    <div className='questionsListForm'>
                        <QuestionsList quizId={this.props.match.params.quizId}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quizData: state.currentQuiz,
        fetchQuizBool: state.fetchQuiz,
        deleteQuiz: state.deleteQuiz,
    };
}

export default connect(
    mapStateToProps,
    { deleteQuiz, fetchQuiz }
)(ViewQuizCard);