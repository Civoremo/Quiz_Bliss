import React from 'react';
import axios from 'axios';

class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            image: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createAccount = () => {
        axios({
            method: 'post',
            url: 'https://lambda-study-app.herokuapp.com/api/auth/register',
            data: {
                username: `${this.state.username}`,
                email: `${this.state.email}`,
                password: `${this.state.password}`,
                // img_url: `${this.state.image}`,
            }
        })
        .then(res => {
            console.log(res);
            this.setState({
                token: res.token,
                email: '',
                password: ''
            });
            localStorage.setItem('token', this.state.token);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }


    render() {
        return (
            <div>
                <form onSubmit={this.createAccount}>
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='username'
                        name='username'
                        value={this.state.username}
                        required={true}
                        autoComplete='false'
                    />
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='email'
                        name='email'
                        value={this.state.email}
                        required={true}
                        autoComplete='false'
                    />
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='password'
                        name='password'
                        value={this.state.password}
                        required={true}
                        autoComplete='false'
                    />
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        placeholder='image'
                        name='image'
                        value={this.state.image}
                        required={false}
                        autoComplete='false'
                    />
                </form>
                <button onClick={() => this.createAccount()}>Create Account</button>
            </div>
        );
    }
}

export default Create;