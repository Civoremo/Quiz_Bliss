import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import axios from 'axios';

import '../styles/QuestionsList.css';

class QuestionsList extends React.Component {
    constructor() {
        super();
        this.state = {
            questionIndex: 0,
            radioPick: null,
            savedAnswers: [],
            fetched: false,
            quizScore: 0,
            finalScore: null,
            quizStarted: false,
            quizFinished: false,
        }
    }

    componentDidMount() {
        const id = this.props.quizId;
        this.props.fetchQuestions(id);
    }

    nextQuestion = e => {
        if(this.state.questionIndex < this.props.questions.length - 1) {
            this.setState({
                questionIndex: this.state.questionIndex +1
            });
        }
        else if (this.state.questionIndex === this.props.questions.length - 1) {
            this.setState({
                quizFinished: true,
            });
        }
    }

    pickedAnswer = id => {
        this.setState({
            radioPick: id
        });
        
    }

    savePick = id => {
        axios({
                method: 'patch',
                url: `https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.quizId}/questions/${this.props.questions[this.state.questionIndex].id}/`,

                data: {
                    option: id +1
                }
            })
            .then(res => {
                if(res.data.correct === true) {
                    this.setState({
                        quizScore: this.state.quizScore +1,
                        radioPick: null,
                        
                    });
                    this.finalQuizScore();
                }
                else {
                    console.log(res.data.correct)
                }
            })
            .catch(err => {
                console.log(err);
            });
            this.nextQuestion();
    }

    finalQuizScore = () => {
        const tempScore = (parseInt(this.state.quizScore) / parseInt(this.props.questions.length));
        
        this.setState({
            finalScore: tempScore
        });
    }


    render () {
        if(this.props.questions.length === 0) {
            return <div>Loading Quiz Questions ...</div>
        }
        console.log(this.state.finalScore);
        return (
            <div>
                <div>Total Quiz Questions: {this.props.questions.length}</div>
                <div className={this.state.quizFinished ? 'finished' : ''}>
                    <span>{this.props.questions[this.state.questionIndex].question}</span>
                    {this.props.questions[this.state.questionIndex].options.map((answer, index) => {
                        return (
                            <div key={index}>
                                <input 
                                    type="radio"
                                    id={index}
                                    onChange={() => this.pickedAnswer(index)}
                                    checked={this.state.radioPick === index ? true : false}
                                />
                                <span>{answer}</span>
                            </div>
                        );
                    })}
                    <button onClick={() => this.savePick(this.state.radioPick)}>Save Answer</button>
                </div>
                <div className={this.state.quizFinished ? '' : 'finished'}>
                    Final Score: {parseFloat(this.state.finalScore * 100).toFixed(2)}%
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        questions: state.questions,
        fetchingQuestions: state.fetchingQuestions,
    };
}

export default connect(
    mapStateToProps,
    { fetchQuestions }
)(QuestionsList);