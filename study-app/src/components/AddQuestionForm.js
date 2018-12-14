import React from 'react';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';

class AddQuestionForm extends React.Component {
    constructor() {
        super();
        this.state = {
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

    addQuestionToQuiz = e => {
        e.preventDefault();
        if(this.state.question !== '' && this.state.answ1 !== '' && this.state.answ2 !== '' && this.state.correctAnsw !== '') {
            this.props.addQuestion(this.props.quizId, this.state.question, this.state.answ1, this.state.answ2, this.state.answ3, this.state.answ4, this.state.correctAnsw);
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


    render () {
        return (
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
                        placeholder='required correct answer #(1-4)'
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
        );
    }
}

export default connect(
    null,
    { addQuestion }
)(AddQuestionForm);