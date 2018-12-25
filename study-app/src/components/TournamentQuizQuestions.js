import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

import '../styles/TournamentQuizQuestions.css';

class TournamentQuizQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
        }
    }

    componentDidUpdate(prevState) {
        if(this.props.fetchingQuestions !== prevState.fetchingQuestions) {
            console.log('trying to fetch questions')
            if(!this.props.fetchingQuestions && this.state.questions === null) {
                console.log('setting questions')
                this.props.fetchQuestions(this.props.quizId);
                this.setState({
                    questions: this.props.allQuestions,
                });
            }
        }
    }

    componentDidMount() {
        this.props.fetchQuestions(this.props.quizId);
        // this.setState({
        //     questions: this.props.allQuestions,
        // });
    }

    render() {
        if(this.state.questions === null) {
            console.log(this.state.questions)
            return <></>
        }
        return (
            <div className='tourQuiz-container'>
                <div className='tourQuiz-topic-container'>
                    {this.props.quizTitle}
                </div>
                <div>
                    {this.props.allQuestions.map((question, index) => {
                        return (
                            <div key={index} className='questionPlaceholder' onClick={() => this.props.toggleModal(this.props.quizId, question.id, question)}>
                            {(index + 1) * 200}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allQuestions: state.questions,
        fetchingQuestions: state.fetchingQuestions,
    }
}

export default connect(
    mapStateToProps,
    { fetchQuestions }
)(TournamentQuizQuestions);