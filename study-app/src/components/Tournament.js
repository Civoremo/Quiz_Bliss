import React from 'react';
import { connect } from 'react-redux';
import { fetchQuizzes, fetchQuestions } from '../actions';

import '../styles/Tournament.css';
import TournamentQuizQuestions from './TournamentQuizQuestions';

class Tournament extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            questionIndex: null,
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
        });
    }

    render() {
        console.log(this.props.allQuestions)
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
                        <div>
                            {this.state.questionIndex === null ? "" : this.props.allQuestions[this.state.questionIndex].question}
                        </div>
                        <dir>
                            {this.state.questionIndex === null ? '' : this.props.allQuestions[this.state.questionIndex].options.map((answer, index) => {
                                return (
                                    <button key={index}>{answer}</button>
                                );
                            })}
                        </dir>
                    </div>
                </div>
            
                <div className='tournament-score-container'>
                    <div>
                        Score: 200
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