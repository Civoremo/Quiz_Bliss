import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizzes } from '../actions';
import '../styles/QuizCard.css';

import QuizCard from './QuizCard';
import Topics from './Topics';
import Authors from './Authors';

let topics = ['All'];
let authorsList = [];

class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTopics: [],
            topicSelected: '',
        }

    }

    componentDidUpdate (prevState) {
        if(this.props.addingQuiz !== prevState.addingQuiz || this.props.deleteQuiz !== prevState.deleteQuiz) {
            if(!this.props.addingQuiz && !this.props.deleteQuiz) {
                this.props.fetchQuizzes();
            }
        }
    }


    componentDidMount() {
        console.log('this function is being called')
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
        
        this.props.quizzes.forEach(quiz => {
            topics.push(quiz.topic);
        })

        let filteredTopics = topics.filter((v, i) => topics.indexOf(v) === i)

        this.props.quizzes.forEach(quiz => {
            authorsList.push(quiz.author);
        })

        let filteredAuthor = authorsList.filter((v, i) => authorsList.indexOf(v) === i)

        let filteredQuizzes = this.props.quizzes.filter(quiz => {
            if(quiz.topic.toLowerCase().indexOf(this.state.topicSelected.toLowerCase()) !== -1 || 
                quiz.author.toLowerCase().indexOf(this.state.topicSelected.toLowerCase()) !== -1) {
                return quiz;
            }
            return null;
        })


        return (
            <div>
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