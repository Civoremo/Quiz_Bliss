import React from 'react';
import { connect } from 'react-redux';
import { fetchQuizzes, fetchQuestions } from '../actions';
import axios from 'axios';

import '../styles/Tournament.css';
import TournamentQuizQuestions from './TournamentQuizQuestions';

class Tournament extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            questionIndex: null,
            pickedQuizId: null,
            pickedQuestionId: null,
            questionValue: null,
            score: 0,
        }
    }

    componentDidMount() {
        this.props.fetchQuizzes();
    }

    toggleQuestionModal = (selectedQuizId, selectedQuestionIndex) => {
        this.props.fetchQuestions(selectedQuizId);
        this.setState({
            questionIndex: selectedQuestionIndex,
            showModal: !this.state.showModal,
            pickedQuizId: selectedQuizId,
            questionValue: ((selectedQuestionIndex + 1) * 200),
        });
    }

    submitAnswer = (pickedAns) => {
        axios({
            method: 'get',
            url: `https://lambda-study-app.herokuapp.com/api/quizzes/${this.state.pickedQuizId}/questions/${this.props.allQuestions[this.state.questionIndex].id}/response`,

            params: {
                option: pickedAns +1,
            }
        })
        .then(res => {
            console.log(res.data.correct);
            if(res.data.correct === true) {
                this.setState({
                    score: this.state.score +this.state.questionValue,
                    showModal: false,
                    questionIndex: null,
                    pickedQuizId: null,
                    pickedQuestionId: null,
                    questionValue: null,
                });
            } else {
                this.setState({
                    score: this.state.score -this.state.questionValue,
                    showModal: false,
                    questionIndex: null,
                    pickedQuizId: null,
                    pickedQuestionId: null,
                    questionValue: null,
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        // console.log(this.props.allQuestions)
        return (
            <div className='tournament-container'>
                <div className='tournament-topic-container'>
                    {this.props.allQuizzes.map(quiz => {
                        if(quiz.author === 'nedim' && quiz.topic === 'Challenge One') {
                            return (
                                <div key={quiz.id}>
                                    <TournamentQuizQuestions quizId={quiz.id} quizTitle={quiz.title} toggleModal={this.toggleQuestionModal}/>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                    <div className={this.state.showModal ? 'question-modal' : 'hideModal'}>
                        <div className='tourModal-question-container'>
                            {this.state.questionIndex === null ? "" : this.props.allQuestions[this.state.questionIndex].question}
                        </div>
                        <dir className='tourModal-answers-container'>
                            {this.state.questionIndex === null ? '' : this.props.allQuestions[this.state.questionIndex].options.map((answer, index) => {
                                return (
                                    <button key={index} onClick={() => this.submitAnswer(index)}>{answer}</button>
                                );
                            })}
                        </dir>
                        <div className='tourModal-saveBtn-container'>
                            <button className='tourModal-saveBtn'>Confirm</button>
                        </div>
                    </div>
                </div>
            
                <div className='tournament-score-container'>
                    <div>
                        Score: {this.state.score}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allQuizzes: state.quizzes,  // array
        allQuestions: state.questions, // array
    }
}

export default connect(
    mapStateToProps,
    { fetchQuizzes, fetchQuestions }
)(Tournament);