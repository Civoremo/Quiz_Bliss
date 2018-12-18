import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteQuiz, fetchQuiz, fetchQuestions, updateQuizUserRelation } from '../actions';
import '../styles/ViewQuizCard.css';

import QuestionsList from './QuestionsList';
import EditQuiz from './EditQuiz';

class ViewQuizCard extends React.Component {
    constructor() {
        super();
        this.state = {
            displayModal: false,
            displayEditForm: false,
            quizLetterGrade: '',
            userVote: null,
            favorite: null,
            upVoted: null,
            downVoted: null,
            userScore: null,
            expandDescription: false,
        }
    }

    componentDidUpdate(prevState) {
        if(this.props.quizData !== prevState.quizData) {
            if(!this.props.fetchingQuestions) {
                if(this.props.quizData.score === 0) {
                    this.setState({
                        quizLetterGrade: 'Take Quiz',
                        userVote: this.props.quizData.user_vote,
                        favorite: this.props.quizData.favorite,
                    });
                }
                else {
                    this.finalQuizScore();
                    this.setState({
                        userVote: this.props.quizData.user_vote,
                        favorite: this.props.quizData.favorite,
                        userScore: this.props.quizData.score,
                    });
                }
                
                if(this.props.quizData.user_vote === 1) {
                    this.setState({
                        upVoted: true,
                        downVoted: false,
                    });
                }
                else if(this.props.quizData.user_vote === -1) {
                    this.setState({
                        downVoted: true,
                        upVoted: false,
                    });
                }
                else {
                    this.setState({
                        upVoted: false,
                        downVoted: false,
                    });
                }
            }
            if(localStorage.getItem('userToken') === 'guest') {
                this.setState({
                    quizLetterGrade: 'Sign in to View'
                });
            }
        }
        
        if(this.props.updateUserQuiz !== prevState.updateUserQuiz) {
            if(!this.props.fetchQuizBool && !this.props.updateUserQuiz) {
                this.props.fetchQuiz(this.props.match.params.quizId);
            }
        }
    }

    componentDidMount() {
        this.props.fetchQuiz(this.props.match.params.quizId);
        this.props.fetchQuestions(this.props.match.params.quizId);        
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

    finalQuizScore = () => {
        const tempScore = (parseInt((this.props.quizData.score) / parseInt(this.props.questions.length) * 100).toFixed(2));
        console.log(tempScore);
        console.log(this.props.quizData.score);
        switch (true) {
            case (tempScore <= 59):
                this.setState({
                    quizLetterGrade: 'F',
                });
            break;
            case ( tempScore <= 63):
                this.setState({
                    quizLetterGrade: 'D-',
                });
            break;
            case (tempScore <= 67):
                this.setState({
                    quizLetterGrade: 'D',
                });
            break;
            case (tempScore <= 69):
                this.setState({
                    quizLetterGrade: 'D+',
                });
            break;
            case (tempScore <= 73):
                this.setState({
                    quizLetterGrade: 'C-',
                });
            break;
            case (tempScore <= 77):
                this.setState({
                    quizLetterGrade: 'C',
                });
            break;
            case (tempScore <= 79):
                this.setState({
                    quizLetterGrade: 'C+',
                });
            break;
            case (tempScore <= 83):
                this.setState({
                    quizLetterGrade: 'B-',
                });
            break;
            case (tempScore <= 87):
                this.setState({
                    quizLetterGrade: 'B',
                });
            break;
            case (tempScore <= 89):
                this.setState({
                    quizLetterGrade: 'B+',
                });
            break;
            case (tempScore <= 93):
                this.setState({
                    quizLetterGrade: 'A-',
                });
            break;
            case (tempScore <= 97):
                this.setState({
                    quizLetterGrade: 'A',
                });
            break;
            case (tempScore <= 100):
                this.setState({
                    quizLetterGrade: 'A+',
                });
            break;
            default:
            break;
        }
    }

    upVoteQuiz = e => {
        e.preventDefault();
        if(localStorage.getItem('userToken') !== 'guest') {
            if(this.state.userVote === 0 || this.state.userVote === -1) {
                this.setState({
                    userVote: 1,
                    upVoted: true,
                    downVoted: false,
                }, () => {
                    this.updateUserQuizData();
                });
            } else if(this.state.userVote === 1) {
                this.setState({
                    userVote: 0,
                    upVoted: false,
                    downVoted: false,
                }, () => {
                    this.updateUserQuizData();
                });
            }
        }        
    }

    downVoteQuiz = e => {
        e.preventDefault();
        if(localStorage.getItem('userToken') !== 'guest') {
            if(this.state.userVote !== -1) {
                this.setState({
                    userVote: -1,
                    upVoted: false,
                    downVoted: true,
                }, () => {
                    this.updateUserQuizData();
                });
            } else if (this.state.userVote === -1) {
                this.setState({
                    userVote: 0,
                    upVoted: false,
                    downVoted: false,
                }, () => {
                    this.updateUserQuizData();
                });
            }
        }
    }

    toggleFavQuiz = e => {
        e.preventDefault();
        if(localStorage.getItem('userToken') !== 'guest') {
            this.setState({
                favorite: !this.state.favorite,
            }, () => {
                this.updateUserQuizData();
            });
        }
    }

    toggleDescription = e => {
        e.preventDefault();
        this.setState({
            expandDescription: !this.state.expandDescription
        });
    }

    updateUserQuizData = e => {
        // quizId, vote, favBool, score
        this.props.updateQuizUserRelation(this.props.match.params.quizId, this.state.userVote, this.state.favorite, this.props.quizData.score);
    }


    render () {
        if(this.props.quizData.length === 0) {
            return <></>
        }
        return (
            <div className='viewQuiz-container'>
                <div>
                    <div className='quiz-info-container'>
                        <div className={localStorage.getItem('userToken') === 'guest' || localStorage.getItem('username') !== `${this.props.quizData.author.username}` ? 'guestHideFeature' : 'quiz-delete-btn'}>
                            <span className='entireQuiz-editQuizBtn' onClick={this.editQuizForm}>{this.state.displayEditForm ? 'cancel edit' : 'edit quiz'}</span>
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
                            <div className='quizContainer'>
                                <div>
                                    <img src={this.props.quizData.author.img_url === null ? "https://bit.ly/2C9tLJe" : `${this.props.quizData.author.img_url}`} alt="profile" className='quiz-profile-image'/>
                                    <div className='quizVote-container'>
                                        <button className={this.state.upVoted ? 'quizVote-content-toggle' : 'quizVote-content'} onClick={this.upVoteQuiz}>up</button>
                                        <button className={this.state.downVoted ? 'quizVote-content-toggle' : 'quizVote-content'} onClick={this.downVoteQuiz}>down</button>
                                        <button className={this.state.favorite ? 'quizVote-content-fav' : 'quizVote-content'} onClick={this.toggleFavQuiz}>fav</button>
                                    </div>
                                </div>
                                <div>
                                    <div className='quizView-info'>Title: <span className='quizView-text'>{this.props.quizData.title}</span></div>
                                    <div className='quizView-info'>Topic: <span className='quizView-text'>{this.props.quizData.topic}</span></div>
                                    <div className='quizView-info'>Author: <span className='quizView-text'>{this.props.quizData.author.username}</span></div>
                                    <div className='quizView-info'>Votes: <span className='quizView-text'>{this.props.quizData.votes}</span></div>
                                </div>
                            </div>
                            
                            <div className='quizUserInfo-container'>
                                <div className='quizScore-container'>
                                    {/* <div className='score-container'>
                                        Your Quiz Score: {this.props.quizData.score}
                                    </div> */}
                                    <div className='gradeLetter-container'>
                                        <div className='gradeLetter-title'>Your Quiz Grade</div>
                                        <div className='gradeLetter-content'>
                                            {localStorage.getItem('userToken' === 'guest') ? 'Sign in to View Score' : `${this.state.quizLetterGrade}`}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className='quizInfo-description-container' onClick={this.toggleDescription}>
                            <div className='quizInfo-description-label'>
                                Description:
                            </div>
                            <div className={this.state.expandDescription ? 'quizInfo-description-text ' : 'clipDescription'}>
                                {this.props.quizData.description !== null ? `${this.props.quizData.description}` : 'None'}
                            </div>
                        </div>
                    </div>
                    <div className={this.state.displayEditForm ? 'editQuizForm' : 'showEditQuizForm'}>
                        <EditQuiz quizId={this.props.match.params.quizId} />
                    </div>
                    <div className='questionsListForm'>
                        <QuestionsList quizId={this.props.match.params.quizId} quizQuestions={this.props.questions} fav={this.state.favorite} userVote={this.state.userVote} currentScore={this.state.userScore}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quizData: state.currentQuiz,
        questions: state.questions,
        fetchQuizBool: state.fetchQuiz,
        fetchingQuestions: state.fetchingQuestions,
        deleteQuiz: state.deleteQuiz,
        updateUserQuiz: state.updateUserQuizRelation,
    };
}

export default connect(
    mapStateToProps,
    { deleteQuiz, fetchQuiz, fetchQuestions, updateQuizUserRelation }
)(ViewQuizCard);