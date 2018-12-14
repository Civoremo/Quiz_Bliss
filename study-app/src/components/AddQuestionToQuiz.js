import React from 'react';
import { connect } from 'react-redux';
import { addQuestion, fetchQuestions, deleteQuestion, editQuestion } from '../actions';

import '../styles/AddQuestion.css';

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
            correctAnsw: '',
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    componentDidUpdate (prevState) {
        if(this.props.addingQuestion !== prevState.addingQuestion) {
            if(!this.props.addingQuestion) {
                this.props.fetchQuestions(this.props.match.params.quizId);
            }
        }
    }

    componentDidMount () {
        this.props.fetchQuestions(this.props.match.params.quizId);
    }

    addQuestionToQuiz = e => {
        e.preventDefault();
        if(this.state.question !== '' && this.state.answ1 !== '' && this.state.answ2 !== '' && this.state.correctAnsw !== '') {
            this.props.addQuestion(this.props.match.params.quizId, this.state.question, this.state.answ1, this.state.answ2, this.state.answ3, this.state.answ4, this.state.correctAnsw);
            this.setState({
                question: '',
                answ1: '',
                answ2: '',
                answ3: '',
                answ4: '',
                correctAnsw: '',
            });
            
        }
        else {
            alert('check input fields and try again');
        }
    }

    removeQuestion = id => {
        this.props.deleteQuestion(this.props.match.params.quizId, id);

    }

    // still requires setting up args for editing question
    // quizID, questionID, questionText, ans1Text, ans2Text, ans3Text, ans4Text, correctAnsNumber
    changeQuestionInfo = id => {
        this.props.editQuestion(
            this.props.match.params.quizId,  // quizID
            id, // questionID
        )
    }


    render() {
        return (
            <div className='addEditQuestion-content'>
                <div className='addQuestionForm-container'>
                    <form onSubmit={this.addQuestionToQuiz} className='addQuestionForm'>
                        <div className='addNewQuestion-title-text'>Add New Question Form</div>
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='required question'
                            name='question'
                            value={this.state.question}
                            required={true}
                            autoComplete='false'
                            className='addQuestionInput'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='required answer #1'
                            name='answ1'
                            value={this.state.answ1}
                            required={true}
                            autoComplete='false'
                            className='addQuestionInput'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='required answer #2'
                            name='answ2'
                            value={this.state.answ2}
                            required={true}
                            autoComplete='false'
                            className='addQuestionInput'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='optional answer #3'
                            name='answ3'
                            value={this.state.answ3}
                            required={false}
                            autoComplete='false'
                            className='addQuestionInput'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='optional answer #4'
                            name='answ4'
                            value={this.state.answ4}
                            required={false}
                            autoComplete='false'
                            className='addQuestionInput'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="number"
                            placeholder='correct answer #(1-4)'
                            name='correctAnsw'
                            value={this.state.correctAnsw}
                            required={true}
                            min='1'
                            max='4'
                            className='addQuestionInput'
                        />
                        <button className='addNewQuestion-form-btn' onClick={this.addQuestionToQuiz}>Save New Question</button>
                    </form>
                </div>
                
                <div className='questionAnswer-container'>
                    {this.props.allQuestions.map((quest, index) => {
                        return (
                            <div key={quest.id} className='currentQuestion-container'>
                                <div className='questionAnswer-info'>
                                    <div className='questionLabel-text'>Question: #{index+1}</div>
                                    <div className='text-divSpacing'>
                                        {quest.question}
                                    </div>
                                    <ul>
                                        {quest.options.map((answer, index) => {
                                            return (
                                                <li key={index} className='text-divSpacing answerSpacing'>- {answer}</li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                
                                <div className='questionAnswer-btn-container'>
                                    <button className='questionAnswerBtn' onClick={() => this.removeQuestion(quest.id)}>delete Question</button>
                                    <button className='questionAnswerBtn'>edit Question</button>
                                </div>
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
    };
}

export default connect(
    mapStateToProps,
    { addQuestion, fetchQuestions, deleteQuestion, editQuestion }
)(AddQuestionToQuiz);