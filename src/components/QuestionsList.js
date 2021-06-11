import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions, updateQuizUserRelation } from '../actions';
import axios from 'axios';

import '../styles/QuestionsList.css';

const baseUrl = process.env.REACT_APP_QUIZ_API;

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
			answerPicked: false
		};
	}

	nextQuestion = (e) => {
		if (this.state.questionIndex < this.props.questions.length - 1) {
			this.setState({
				questionIndex: this.state.questionIndex + 1,
				answerPicked: false
			});
		} else if (this.state.questionIndex === this.props.questions.length - 1) {
			this.setState(
				{
					quizFinished: true,
					answerPicked: false
				},
				() => {
					this.updateUserQuizData();
				}
			);
			this.finalQuizScore();
		}
	};

	pickedAnswer = (id) => {
		this.setState({
			radioPick: id
		});
	};

	savePick = (e) => {
		e.preventDefault();
		if (this.state.radioPick === null) {
			this.setState({
				answerPicked: true
			});
			return <div />;
		} else if (this.state.radioPick !== null) {
			axios({
				method: 'get',
				url: `${baseUrl}api/quizzes/${this.props.quizId}/questions/${this.props.questions[
					this.state.questionIndex
				].id}/response`,

				params: {
					option: this.state.radioPick + 1
				}
			})
				.then((res) => {
					if (res.data.correct === true) {
						this.setState({
							quizScore: this.state.quizScore + 1,
							radioPick: null,
							answerPicked: false
						});
					} else {
						this.setState({
							radioPick: null,
							answerPicked: false
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		setTimeout(() => this.nextQuestion(), 200);
		setTimeout(() => this.finalQuizScore(), 500);
	};

	finalQuizScore = () => {
		const tempScore = parseInt(this.state.quizScore / parseInt(this.props.questions.length) * 100).toFixed(2);

		switch (true) {
			case tempScore <= 59:
				this.setState({
					finalScore: 'F'
				});
				break;
			case tempScore <= 63:
				this.setState({
					finalScore: 'D-'
				});
				break;
			case tempScore <= 67:
				this.setState({
					finalScore: 'D'
				});
				break;
			case tempScore <= 69:
				this.setState({
					finalScore: 'D+'
				});
				break;
			case tempScore <= 73:
				this.setState({
					finalScore: 'C-'
				});
				break;
			case tempScore <= 77:
				this.setState({
					finalScore: 'C'
				});
				break;
			case tempScore <= 79:
				this.setState({
					finalScore: 'C+'
				});
				break;
			case tempScore <= 83:
				this.setState({
					finalScore: 'B-'
				});
				break;
			case tempScore <= 87:
				this.setState({
					finalScore: 'B'
				});
				break;
			case tempScore <= 89:
				this.setState({
					finalScore: 'B+'
				});
				break;
			case tempScore <= 93:
				this.setState({
					finalScore: 'A-'
				});
				break;
			case tempScore <= 97:
				this.setState({
					finalScore: 'A'
				});
				break;
			case tempScore <= 100:
				this.setState({
					finalScore: 'A+'
				});
				break;
			default:
				break;
		}
	};

	startingQuiz = (e) => {
		e.preventDefault();
		this.setState({
			quizStarted: !this.state.quizStarted
		});
	};

	tryAgainQuiz = (e) => {
		e.preventDefault();
		window.location.reload();
	};

	updateUserQuizData = (e) => {
		// if(this.state.quizScore > this.props.userScore) {
		// quizId, vote, favBool, score
		this.props.updateQuizUserRelation(this.props.quizId, this.props.userVote, this.props.fav, this.state.quizScore);
		// }
		// else {
		//     return null;
		// }
	};

	render() {
		if (this.props.questions.length === 0) {
			return <div />;
		}
		return (
			<div>
				<div className={this.state.quizStarted ? 'question-container' : 'startQuiz'}>
					<span className='question-title'>{this.props.questions[this.state.questionIndex].question}</span>
					<div className='allAnswer-container'>
						{this.props.questions[this.state.questionIndex].options.map((answer, index) => {
							return (
								<div key={index} className='answer-content'>
									<div className='radioBtn-container'>
										<input
											type='radio'
											id={index}
											onChange={() => this.pickedAnswer(index)}
											checked={this.state.radioPick === index ? true : false}
											className='radio-btn'
										/>
									</div>
									<div className='answerText-container'>
										<span className='answer-text'>{answer}</span>
									</div>
								</div>
							);
						})}
					</div>
					<button className='saveAnswer-btn' onClick={this.savePick}>
						Save Answer
					</button>
					<div className={this.state.answerPicked ? 'missingAnswer' : 'finished'}>Select Answer!</div>
				</div>
				<div className={this.state.quizStarted ? 'startQuiz' : 'quiz-start-container'}>
					<div>
						<span className='quizBegin-btn' onClick={this.startingQuiz}>
							START QUIZ
						</span>
					</div>
				</div>
				<div className={this.state.quizFinished ? 'quiz-finished-container' : 'finished'}>
					<div>
						<div className='quizFinalScore-text'>Quiz Score: {this.state.finalScore}</div>
					</div>
					<div>
						<div className='quizFinalTryAgain-btn' onClick={this.tryAgainQuiz}>
							Try Again
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		questions: state.questions,
		fetchingQuestions: state.fetchingQuestions
	};
};

export default connect(mapStateToProps, { fetchQuestions, updateQuizUserRelation })(QuestionsList);
