import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizzes } from '../actions';
import '../styles/QuizCard.css';

import QuizCard from './QuizCard';
import CreateNewQuiz from './CreateNewQuiz';
import CarouselQuizzes from './CarouselQuizzes';

let topics = ['All'];
let authorsList = ['All'];
let filteredTopics = [];
let filteredAuthor = [];
let filteredQuizzes = [];
let popQuizzes = [];

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
            }
        }
    }

    componentDidMount() {
        this.props.fetchQuizzes();
    }

    clickedTopic = e => {
        e.preventDefault();
        const tempValue = document.getElementById('topicSelection').value;
        console.log(tempValue);

        if(tempValue !== 'All') {
            this.setState({
                topicSelected: tempValue,
            });
        } else {
            this.setState({
                topicSelected: '',
            });
        }
        
    }

    clickedAuthor = e => {
        e.preventDefault();
        const tempValue = document.getElementById('authorSelection').value;
        console.log(tempValue);

        if(tempValue !== 'All') {
            this.setState({
                topicSelected: tempValue,
            });
        } else {
            this.setState({
                topicSelected: '',
            });
        }
        
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
        
        popQuizzes = this.sortByVotes(this.props.quizzes);
    }

    sortByVotes = (objectArr) => {
        function compareObjects(a, b) {
            if( a.votes > b.votes ) {
                return -1;
            }
            if( a.votes < b.votes ) {
                return 1;
            }
            return 0;
        }
        return objectArr.sort(compareObjects);
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
                <div>
                    <CarouselQuizzes popularQuizzes={popQuizzes.slice(0, 10)} history={this.props.history}/>
                </div>
                <div className='quizzes-container-content'>
                    <div className='sortingQuiz-container'>
                        <h3 className='list-title'>Quizzes</h3>
                        <div className='sort-content-container'>
                            <div className='sort-container'>
                                <span>
                                    Sort by Topic
                                </span>
                                <form>
                                    <select id='topicSelection'>
                                        {filteredTopics.map((topic, index) => {
                                            return (
                                                <option 
                                                    key={index} 
                                                    value={`${topic}`} 
                                                >
                                                    {topic}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <button onClick={this.clickedTopic}>Go</button>
                                </form>
                            </div>
                            <div className='sort-container'>
                                <span>
                                    Sort by Author
                                </span>
                                <form>
                                    <select id='authorSelection'>
                                        {filteredAuthor.map((author, index) => {
                                            return (
                                                <option 
                                                    key={index} 
                                                    value={`${author}`}                                                     
                                                >
                                                    {author}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <button onClick={this.clickedAuthor}>Go</button>
                                </form>
                            </div>
                        </div>
                    </div>
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