import React from 'react';
import { connect } from 'react-redux';
import { addNewQuiz } from '../actions';

class CreateNewQuiz extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            topic: '',
        }
    }


    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addingNewQuiz = e => {
        const token = localStorage.getItem('userToken');
        this.props.addNewQuiz(this.state.title, this.state.topic, token);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <form >
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='title'
                        name='title'
                        value={this.state.title}
                        required={true}
                    />
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='topic'
                        name='topic'
                        value={this.state.topic}
                        required={true}
                    />
                    <button onClick={() => this.addingNewQuiz()}>Add Quiz</button>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    { addNewQuiz }
)(CreateNewQuiz);