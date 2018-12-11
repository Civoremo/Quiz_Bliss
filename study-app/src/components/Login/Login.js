import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            token: '',
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkLogin = () => {
        axios({
            method: 'post',
            url: 'https://lambda-study-app.herokuapp.com/api/auth/login',
            data: {
                email: `${this.state.email}`,
                password: `${this.state.password}`
            }
        })
        .then(res => {
            console.log(res);
            this.setState({
                token: res.data.token,
                email: '',
                password: ''
            });
            localStorage.setItem('userToken', this.state.token);
            // window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }


    render() {
        return (
            <div>
                <form onSubmit={this.checkLogin}>
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
                </form>
                <button onClick={() => this.checkLogin()}>Login</button>
            </div>
        );
    }
}

export default Login;