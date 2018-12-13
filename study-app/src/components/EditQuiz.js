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
        }
    }

    componentDidMount() {
        axios
            .get(`${baseUrl}api/quizzes/${this.props.quizId}`)
            .then(res => {
                console.log(res);
                this.setState({
                    title: res.data.title,
                    topic: res.data.topic,
                });
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
            this.props.editQuizInfo(id, this.state.title, this.state.topic);
            window.location.reload();
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
                    <div>
                        {/* <div>Title</div> */}
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='new title'
                            value={this.state.title}
                            name='title'
                            required={true}
                            className='newQuiz-inputField'
                        />
                    </div>
                    <div>
                        {/* <div>Topic</div> */}
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='new topic'
                            value={this.state.topic}
                            name='topic'
                            required={true}
                            className='newQuiz-inputField'
                        />
                    </div>
                    <div className='editQuizForm-btn-container'>
                        <button className='addNewQuiz-btn' onClick={this.saveQuizEdits}>Save Edit</button>
                        <button className='addNewQuiz-btn' onClick={this.cancelEdit}>Cancel Edit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    { editQuizInfo }
)(EditQuiz);