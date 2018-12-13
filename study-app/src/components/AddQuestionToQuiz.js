import React from 'react';
import { connect } from 'react-redux';
import { addQuestion, fetchQuestions } from '../actions';
// import axios from 'axios';

class AddQuestionToQuiz extends React.Component {
    constructor() {
        super();
        this.state = {
            currentQuestions: [],
            question: '',
            answ1: '',
            answ2: '',
            answ3: '',
            answ4: '',
            correctAnsw: undefined,
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    // componentDidUpdate (prevState) {
    //     if(this.props.allQuestions !== prevState.allQuestions) {
    //         if(!this.props.fetchingQuestions) {
    //             this.props.fetchQuestions(this.props.match.params.quizId);
    //         }
    //     }
    // }

    componentDidMount () {
        this.props.fetchQuestions(this.props.match.params.quizId);
    }

    addQuestionToQuiz = e => {
        if(this.state.question !== '' && this.state.answ1 !== '' && this.state.answ2 !== '' && this.state.correctAnsw !== undefined) {
            this.props.addQuestion(this.props.match.params.quizId, this.state.question, this.state.answ1, this.state.answ2, this.state.answ3, this.state.answ4, this.state.correctAnsw);
            this.setState({
                question: '',
                answ1: '',
                answ2: '',
                answ3: '',
                answ4: '',
                correctAnsw: undefined,
            });
            
            // window.location.reload();
        }
    }


    render() {
        // if(this.props.allQuestions.length === 0) {
        //     return <></>
        // }
        return (
            <div>
                <form >
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='question'
                        name='question'
                        value={this.state.question}
                        required={true}
                        autoComplete='false'
                    />
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='required answer'
                        name='answ1'
                        value={this.state.answ1}
                        required={true}
                        autoComplete='false'
                    />
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='required answer'
                        name='answ2'
                        value={this.state.answ2}
                        required={true}
                        autoComplete='false'
                    />
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='optional answer'
                        name='answ3'
                        value={this.state.answ3}
                        required={false}
                        autoComplete='false'
                    />
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='optional answer'
                        name='answ4'
                        value={this.state.answ4}
                        required={false}
                        autoComplete='false'
                    />
                    <input 
                        onChange={this.handleChange}
                        type="number"
                        placeholder='correct answer #(1-4)'
                        name='correctAnsw'
                        value={this.state.correctAnsw}
                        required={true}
                        autoComplete='false'
                    />
                    <button>Save New Question</button>
                </form>
                <div>
                    {this.props.allQuestions.map(quest => {
                        return (
                            <div key={quest.id}>
                                {quest.question}
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
    };
}

export default connect(
    mapStateToProps,
    { addQuestion, fetchQuestions }
)(AddQuestionToQuiz);