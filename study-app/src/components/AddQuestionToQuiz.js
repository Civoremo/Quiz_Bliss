import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

import AddQuestionForm from './AddQuestionForm';
import EditDeleteQuestion from './EditDeleteQuestion';
import '../styles/AddQuestion.css';

class AddQuestionToQuiz extends React.Component {
    constructor() {
        super();
        this.state = { }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    componentDidUpdate (prevState) {
        if(this.props.addingQuestion !== prevState.addingQuestion || this.props.deletingQuestion !== prevState.deletingQuestion) {
            if(!this.props.addingQuestion) {
                this.props.fetchQuestions(this.props.match.params.quizId);
            }
        }
    }

    componentDidMount () {
        this.props.fetchQuestions(this.props.match.params.quizId);
    }


    render() {
        return (
            <div className='addEditQuestion-content'>
                <AddQuestionForm quizId={this.props.match.params.quizId}/>
                <div className='questionAnswer-container'>
                    {this.props.allQuestions.map((question, index) => {
                        return (
                            <div>
                                <EditDeleteQuestion question={question} index={index} quizId={this.props.match.params.quizId}/>
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
        addingQuestion: state.addingQuestion,
        deletingQuestion: state.deletingQuestion,
    };
}

export default connect(
    mapStateToProps,
    { fetchQuestions }
)(AddQuestionToQuiz);