import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

import '../styles/TournamentQuizQuestions.css';
import TournamentQuestion from './TournamentQuestion';

class TournamentQuizQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answered: [],
        }
    }

    componentDidMount() {
        this.props.fetchQuestions(this.props.quizId);
    }


    render() {
        const filtered = this.props.completedQuestions.filter(answer => {
            if(answer.quizID === this.props.quizId) {
                return answer
            }
            else {
                return null;
            }
        })
        console.log(filtered)
        return (
            <div className='tourQuiz-container'>
                <div className='tourQuiz-topic-container'>
                    {this.props.quizTitle}
                </div>
                <div className='questionPlaceholder-container'>
                    {this.props.allQuestions.map((question, index) => {
                        if(filtered.quizID === this.props.quizId && filtered.questionIndex === index && filtered.correct === true) {
                            console.log('found true')
                            return (
                                <div key={index} className='questionPlaceholder-answerTrue'>
                                    {/* {(index + 1) * 200} */}
                                    <TournamentQuestion index={index}/>
                                </div>
                            );
                        }
                        else if(filtered.quizID === this.props.quizId && filtered.questionIndex === index && filtered.correct === false) {
                            console.log('found false')
                            return (
                                <div key={index} className='questionPlaceholder-answerFalse'>
                                    {/* {(index + 1) * 200} */}
                                    <TournamentQuestion index={index}/>
                                </div>
                            );
                        }
                        else {
                            console.log('unanswered   ' + this.props.quizId )
                            return (
                                <div key={index} className='questionPlaceholder' onClick={() => this.props.toggleModal(this.props.quizId, index)}>
                                    {/* {(index + 1) * 200} */}
                                    <TournamentQuestion index={index}/>
                                </div> 
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allQuestions: state.questions,
    }
}

export default connect(
    mapStateToProps,
    { fetchQuestions }
)(TournamentQuizQuestions);