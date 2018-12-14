import React from 'react';
import { connect } from 'react-redux';
import { deleteQuestion, editQuestion } from '../actions';

class EditDeleteQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editEnabled: false,
            questionEdit: '',
            answ1Edit: '',
            answ2Edit: '',
            answ3Edit: '',
            answ4Edit: '',
            correctAnswEdit: '',
        }
    }

    componentDidMount() {
        this.setState({
            questionEdit: this.props.question.question,
            answ1Edit: this.props.question.options[0],
            answ2Edit: this.props.question.options[1],
            answ3Edit: this.props.question.options[2],
            answ4Edit: this.props.question.options[3],
            editEnabled: false,
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    removeQuestion = id => {
        this.props.deleteQuestion(this.props.quizId, id);

    }

    toggleEdit = e => {
        this.setState({
            editEnabled: !this.state.editEnabled
        });
    }

    // still requires setting up args for editing question
    // quizID, questionID, questionText, ans1Text, ans2Text, ans3Text, ans4Text, correctAnsNumber
    changeQuestionInfo = id => {
        if(this.state.questionEdit !== '' && this.state.answ1Edit !== '' && this.state.answ2Edit !== '' && this.state.correctAnswEdit !== '') {
            this.props.editQuestion(
                this.props.quizId,  // quizID
                id, // questionID
                this.state.questionEdit,
                this.state.answ1Edit,
                this.state.answ2Edit,
                this.state.answ3Edit,
                this.state.answ4Edit,
                this.state.correctAnswEdit,
            )
        }
        else {
            alert('check edit input fields and try again')
        }
        
    }

    render() {
        if(this.state.questionEdit === '') {
            return <></>
        }
        return (
            <div className='currentQuestionAnswer-container'>
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
                        <button className='questionAnswerBtn' onClick={this.toggleEdit}>{this.state.editEnabled ? 'cancel Edit' : 'edit Question'}</button>
                    </div>
                </div>
                <div className={this.state.editEnabled ? '' : 'toggleQuestionEdit'}>
                    
                    <form  className='addQuestionForm'>
                        <div className='addNewQuestion-title-text'>Edit Question Form</div>
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
                        <button className='addNewQuestion-form-btn' onClick={() => this.changeQuestionInfo(this.props.question.id)}>Save Edit</button>
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