import React from 'react';
import { connect } from 'react-redux';
import { fetchQuizzes } from '../actions';
import '../styles/QuizCard.css';

import QuizCard from './QuizCard';
import Topics from './Topics';

let topics = ['All'];

class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTopics: [],
            topicSelected: '',
        }

    }

    componentDidMount() {
        if(this.props.addingQuiz){
            setTimeout(this.props.fetchQuizzes(), 100);
        }
        else {
            this.props.fetchQuizzes();
        }
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

    render() {

        if(this.props.fetching) {
            return <h3>Loading Data ...</h3>
        }
        
        this.props.quizzes.forEach(quiz => {
            topics.push(quiz.topic);
        })

        let filteredTopics = topics.filter((v, i) => topics.indexOf(v) === i)

        let filteredQuizzes = this.props.quizzes.filter(quiz => {
            if(quiz.topic.toLowerCase().indexOf(this.state.topicSelected.toLowerCase()) !== -1) {
                return quiz;
            }
            return null;
        })


        return (
            <div>
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
                                        <QuizCard quiz={quiz}/>
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
    };
}

export default connect(
    mapStateToProps,
    { fetchQuizzes }
) (QuizList);