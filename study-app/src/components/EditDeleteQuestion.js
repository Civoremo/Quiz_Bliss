import React from 'react';
import { connect } from 'react-redux';
import { deleteQuestion, editQuestion } from '../actions';

class EditDeleteQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editEnabled: false,
        }
    }

    removeQuestion = id => {
        this.props.deleteQuestion(this.props.quizId, id);

    }

    // still requires setting up args for editing question
    // quizID, questionID, questionText, ans1Text, ans2Text, ans3Text, ans4Text, correctAnsNumber
    changeQuestionInfo = id => {
        this.props.editQuestion(
            this.props.quizId,  // quizID
            id, // questionID
        )
    }

    render() {
        return (
            <div key={this.props.question.id} className='currentQuestionAnswer-container'>
                <div className='currentQuestion-container'>
                    <div className='questionAnswer-info'>
                        <div className='questionLabel-text'>Question: #{this.props.index+1}</div>
                        <div className='text-divSpacing'>
                            {this.props.question.question}
                        </div>
                        <ul>
                            {this.props.question.options.map((answer, index) => {
                                return (
                                    <li key={index} className='text-divSpacing answerSpacing'>- {answer}</li>
                                );
                            })}
                        </ul>
                    </div>
                    
                    <div className='questionAnswer-btn-container'>
                        <button className='questionAnswerBtn' onClick={() => this.removeQuestion(this.props.question.id)}>delete Question</button>
                        <button className='questionAnswerBtn'>edit Question</button>
                    </div>
                </div>
                <div className={this.state.editEnabled ? '' : 'editCurrentQuestionAnswer-container'}>
                    <div>Edit Question Form</div>
                    <form >
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='required question'
                            name='questionEdit'
                            value={this.state.questionEdit}
                            required={true}
                            className="addQuestionInput"
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='required answer #1'
                            name='answ1Edit'
                            value={this.state.answ1Edit}
                            required={true}
                            className="addQuestionInput"
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='required answer #2'
                            name='answ2Edit'
                            value={this.state.answ2Edit}
                            required={true}
                            className="addQuestionInput"
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='optional answer #3'
                            name='answ3Edit'
                            value={this.state.answ3Edit}
                            required={false}
                            className="addQuestionInput"
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='optional answer #4'
                            name='answ4Edit'
                            value={this.state.answ4Edit}
                            required={false}
                            className="addQuestionInput"
                        />
                        <input 
                            onChange={this.handleChange}
                            type="number"
                            placeholder='required correct answer #(1-4)'
                            name='correctAnswEdit'
                            value={this.state.correctAnswEdit}
                            required={true}
                            min='1'
                            max='4'
                            className="addQuestionInput"
                        />
                        <button>Save Edit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { deleteQuestion, editQuestion }
)(EditDeleteQuestion);