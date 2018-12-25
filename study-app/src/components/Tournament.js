import React from 'react';
import { connect } from 'react-redux';
import { fetchQuizzes, fetchOneQuestion } from '../actions';

import '../styles/Tournament.css';
import TournamentQuizQuestions from './TournamentQuizQuestions';

class Tournament extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            selectedQuestion: {},
        }
    }

    componentDidMount() {
        this.props.fetchQuizzes();
    }

    toggleQuestionModal = (quizId, questionId, question) => {
        console.log('QUIZID: --' + quizId);
        console.log('QUIZQUESTION: --' + questionId);
        this.setState({
            showModal: !this.state.showModal,
            selectedQuestion: question,
        });
    }

    render() {
        // if(this.state.selectedQuestion === undefined) {
        //     return <></>
        // }
        // console.log('selected question   ' + this.state.selectedQuestion);
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
                            {this.state.selectedQuestion.question}
                        </div>
                        <dir>
                            {/* {this.state.selectedQuestion.options.map((answer, index) => {
                                return (
                                    <button key={index}>{answer}</button>
                                );
                            })} */}
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
        allQuizzes: state.quizzes,
        // allQuestions: state.questions,
    }
}

export default connect(
    mapStateToProps,
    { fetchQuizzes, fetchOneQuestion }
)(Tournament);