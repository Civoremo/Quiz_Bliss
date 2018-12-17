import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizzes } from '../actions';
import '../styles/QuizCard.css';

import QuizCard from './QuizCard';
import Topics from './Topics';
import Authors from './Authors';
import CreateNewQuiz from './CreateNewQuiz';

let topics = ['All'];
let authorsList = [];
let filteredTopics = [];
let filteredAuthor = [];
let filteredQuizzes = [];

class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicSelected: '',
            title: '',
            topic: '',
            newToggle: false,
        }

    }

    componentDidUpdate (prevState) {
        if(this.props.addingQuiz !== prevState.addingQuiz || this.props.deleteQuiz !== prevState.deleteQuiz) {
            if(!this.props.addingQuiz && !this.props.deleteQuiz) {
                this.props.fetchQuizzes();
                this.setState({
                    newToggle: false,
                });
            }
        }
    }

    componentDidMount() {
        this.props.fetchQuizzes();
    }

    clickedTopic = text => {
        if(text !== 'All') {
            this.setState({
                topicSelected: text
            }); 
        } else {
            this.setState({
                topicSelected: ''
            });
        }
    }

    clickedAuthor = text => {
        this.setState({
            topicSelected: text
        });
    }

    createNewToggle = () => {
        this.setState({
            newToggle: !this.state.newToggle
        });
    }

    resetTopicsAuthors = () => {
        this.props.quizzes.forEach(quiz => {
            topics.push(quiz.topic);
        })

        filteredTopics = topics.filter((v, i) => topics.indexOf(v) === i)

        this.props.quizzes.forEach(quiz => {
            authorsList.push(quiz.author);
        })

        filteredAuthor = authorsList.filter((v, i) => authorsList.indexOf(v) === i)

        filteredQuizzes = this.props.quizzes.filter(quiz => {
            if(quiz.topic.toLowerCase().indexOf(this.state.topicSelected.toLowerCase()) !== -1 || 
                quiz.author.toLowerCase().indexOf(this.state.topicSelected.toLowerCase()) !== -1) {
                return quiz;
            }
            return null;
        })
    }
    

    render() {

        if(this.props.fetching) {
            return <h3>Loading Data ...</h3>
        }
        if(this.props.addingQuiz) {
            return <h3>Adding Data ...</h3>
        }
        if(this.props.deleteQuiz) {
            return <h3>Deleting Data ...</h3>
        }

        return (
            <div>
                {this.resetTopicsAuthors()}
                <div className='topics-container'>
                    <h3 className='list-title'>Authors</h3>
                    <div className='topics-content-text'>
                        {filteredAuthor.map((author, index) => {
                            return (
                                <span key={index} onClick={() => this.clickedAuthor(author)}><Authors author={author}/></span>
                            );
                        })}
                    </div>
                </div>
                <div className='topics-container'>
                    <h3 className='list-title'>Topics</h3>
                    <div className='topics-content-text'>
                        {filteredTopics.map((topic, index) => {
                            return (
                                <span key={index} onClick={() => this.clickedTopic(topic)}><Topics topic={topic}/></span>
                            );
                        })}
                    </div>
                </div>
                <div className='quizzes-container-content'>
                    <h3 className='list-title'>Quizzes</h3>
                    <div className='quizzes-container'>
                        <div className={localStorage.getItem('userToken') === 'guest' ? 'guestHideFeature' : 'createNewToggle-btn-container'}>
                            <button onClick={() => this.createNewToggle()} className='createForm-btn'>{this.state.newToggle ? 'Cancel New Quiz' :'+ Create New Quiz'}</button>
                        </div>
                        <div className={this.state.newToggle ? 'createNewForm-container' : 'displayToggle'}>
                        <CreateNewQuiz history={this.props.history}/>
                        </div>

                        {filteredQuizzes.map(quiz => {
                                return (
                                    <div key={quiz.id} className='quiz-card'>
                                        <Link to={`/view/${quiz.id}`}><QuizCard quiz={quiz}/></Link>
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        quizzes: state.quizzes,
        fetching: state.fetching,
        addingQuiz: state.addingQuiz,
        deleteQuiz: state.deleteQuiz,
    };
}

export default connect(
    mapStateToProps,
    { fetchQuizzes }
) (QuizList);