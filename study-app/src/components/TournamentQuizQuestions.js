import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

import '../styles/TournamentQuizQuestions.css';

class TournamentQuizQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.fetchQuestions(this.props.quizId);
    }


    render() {
        return (
            <div className='tourQuiz-container'>
                <div className='tourQuiz-topic-container'>
                    {this.props.quizTitle}
                </div>
                <div>
                    {this.props.allQuestions.map((question, index) => {
                        return (
                            <div key={index} className='questionPlaceholder' onClick={() => this.props.toggleModal(this.props.quizId, index)}>
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
    }
}

export default connect(
    mapStateToProps,
    { fetchQuestions }
)(TournamentQuizQuestions);