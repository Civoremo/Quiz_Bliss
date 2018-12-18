import React from 'react';
import { connect } from 'react-redux';
import { addNewQuiz } from '../actions';
import '../styles/CreateQuizForm.css';

class CreateNewQuiz extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            topic: '',
            descrip: '',
            time: '',
        }
    }


    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addingNewQuiz = e => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');
        const timing = (this.state.time * 60);
        this.props.addNewQuiz(this.state.title, this.state.topic, this.state.descrip, timing, token);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addingNewQuiz}  className='createForm-container'>
                    <div className='createNewQuizForm-container'>
                        <div className='createNewQuizForm-input-container'>
                            <input 
                                onChange={this.handleChange}
                                type="text"
                                placeholder='title'
                                name='title'
                                value={this.state.title}
                                required={true}
                                className='newQuiz-inputField'
                            />
                            <input 
                                onChange={this.handleChange}
                                type="text"
                                placeholder='topic'
                                name='topic'
                                value={this.state.topic}
                                required={true}
                                className='newQuiz-inputField'
                            />
                            <input 
                                onChange={this.handleChange}
                                type="number"
                                placeholder='time (min/s)'
                                name='time'
                                value={this.state.time}
                                min='1'
                                max='20'
                                className='newQuiz-time-inputField'
                            />
                        </div>
                        <div>
                            <textarea 
                                onChange={this.handleChange}
                                type="textarea"
                                placeholder='description'
                                name='descrip'
                                value={this.state.descrip}
                                rows='5'
                                className='newQuiz-description-inputField'
                            />
                        </div>
                    </div>
                    <button onClick={this.addingNewQuiz} className='addNewQuiz-btn'>Add Quiz</button>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    { addNewQuiz }
)(CreateNewQuiz);