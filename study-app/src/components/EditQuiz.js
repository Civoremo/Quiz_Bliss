import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { editQuizInfo } from '../actions';


const baseUrl = 'https://lambda-study-app.herokuapp.com/';

class EditQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            topic: '',
            descrip: '',
            time: '',
        }
    }

    componentDidMount() {
        axios
            .get(`${baseUrl}api/quizzes/${this.props.quizId}`)
            .then(res => {
                console.log(res);
                if(res.data.description === null) {
                    this.setState({
                        title: res.data.title,
                        topic: res.data.topic,
                        descrip: 'none',
                        time: (res.data.time_limit_seconds / 60),
                    });
                } else {
                    this.setState({
                        title: res.data.title,
                        topic: res.data.topic,
                        descrip: res.data.description,
                        time: (res.data.time_limit_seconds / 60),
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    saveQuizEdits = e => {
        e.preventDefault();
        if(this.state.title === '' && this.state.topic === '') {
            console.log('send edit information request not sent');
        }
        else {
            console.log('sending information because fields are filled in');
            const id = this.props.quizId;
            const timing = (this.state.time * 60)
            this.props.editQuizInfo(id, this.state.title, this.state.topic, this.state.descrip, timing);
            // window.location.reload();
        }
    }

    cancelEdit = e => {
        e.preventDefault();
        window.location.reload();
    }


    render () {
        return (
            <div className='editingQuiz-container'>
                <div className='editForm-title-text'>
                    Edit Quiz Information
                </div>
                <form className='editQuizForm-container'>
                    <div className='editQuiz-container-content'>
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='new title'
                            value={this.state.title}
                            name='title'
                            required={true}
                            className='editQuiz-inputField'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='new topic'
                            value={this.state.topic}
                            name='topic'
                            required={true}
                            className='editQuiz-inputField'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="number"
                            placeholder='time (min/s)'
                            value={this.state.time}
                            name='time'
                            className='editQuiz-time-inputField'
                        />
                    </div>
                    <div>
                        <textarea 
                            onChange={this.handleChange}
                            type="textarea"
                            placeholder='description'
                            value={this.state.descrip}
                            name='descrip'
                            rows='5'
                            className='editQuiz-description-inputField'
                        />
                    </div>
                </form>
                <div className='editQuizForm-btn-container'>
                    <button className='editQuizForm-btn' onClick={this.saveQuizEdits}>Save Edit</button>
                    <button className='editQuizForm-btn' onClick={this.cancelEdit}>Cancel Edit</button>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { editQuizInfo }
)(EditQuiz);