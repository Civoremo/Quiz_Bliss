import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

class QuestionsList extends React.Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            questionIndex: 0,
        }
    }

    componentDidUpdate(prevState) {
        if(this.props.fetchingQuestions !== prevState.fetchingQuestions) {
            if(!this.props.fetchingQuestions) {
                this.props.fetchingQuestions(this.props.quizId);
                this.setState({
                    questions: this.props.questions,
                });
            }
        }
    }

    componentDidMount() {
        const id = this.props.quizId;
        this.props.fetchQuestions(id);
        this.setState({
            questions: this.props.questions,
        });
    }

    nextQuestion = e => {
        if(this.state.questionIndex < this.state.questions.length)
        this.setState({
            questionIndex: this.state.questionIndex +1
        });
    }


    render () {
        if(this.props.questions.length === 0) {
            return <div>Loading Quiz Questions ...</div>
        }
        return (
            <div>
                {/* {this.props.questions.map(item => {
                    return (
                        <div key={item.id}>
                            <span>{item.question}</span>
                            {item.options.map((answer, index) => {
                                return (
                                    <div key={index}>
                                        <input 
                                            type="radio"
                                            id={index}
                                        />
                                        <span>{answer}</span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })} */}
                <div>Total Quiz Questions: {this.props.questions.length}</div>
                <div>
                    <span>{this.props.questions[this.state.questionIndex].question}</span>
                    {this.props.questions[this.state.questionIndex].options.map((answer, index) => {
                        return (
                            <div key={index}>
                                <input 
                                    type="radio"
                                    id={index}
                                />
                                <span>{answer}</span>
                            </div>
                        );
                    })}
                    <button>Save Answer</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        questions: state.questions,
        fetchingQuestions: state.fetchingQuestions,
    };
}

export default connect(
    mapStateToProps,
    { fetchQuestions }
)(QuestionsList);