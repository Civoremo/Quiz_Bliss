import React from 'react';
import axios from 'axios';
import '../../styles/Login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            image: '',
            token: '',
            create: false,
            user: {},
            loginFailed: false,
        }
    }
    

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    toggleLogin = e => {
        this.setState({
            create: !this.state.create
        });
    }

    checkLogin = event => {
        event.preventDefault();
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
                password: '',
                user: res.data.user.username
            });
            localStorage.setItem('userToken', res.data.token);
            localStorage.setItem('username', res.data.user.username);
            this.props.login();
        })
        .catch(err => {
            console.log(err);
            this.setState({
                loginFailed: true,
                email: '',
                password: '',
            });
        });
    }

    createAccount = event => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://lambda-study-app.herokuapp.com/api/auth/register',
            data: {
                username: `${this.state.username}`,
                email: `${this.state.email}`,
                password: `${this.state.password}`,
                img_url: `${this.state.image}`,
            }
        })
        .then(res => {
            // console.log(res);
            this.setState({
                token: res.token,
                user: res.data.user.username,
                email: '',
                password: ''
            });
            localStorage.setItem('usertoken', res.data.token);
            localStorage.setItem('username', res.data.user.username);
        })
        .catch(err => {
            console.log(err);
        });
    }


    render() {
        return (
            <div className='authentication-container'>

                <div className={this.state.create ? 'hide' : ''}>
                    <div className='auth-app-title'>
                        <h2 className='auth-app-title-content'>Study App</h2>
                    </div>
                    <div className='create-body-content'>
                        <h2 className='authentication-title'>Login</h2>
                    </div>
                    <div className={this.state.loginFailed ? 'create-body-content' : 'hide'}>
                        <p className='login-warning'>Username and/or password incorrect, please try again</p>
                    </div>
                </div>
                
                <div className={this.state.create ? '' : 'hide'}>
                    <div className='auth-app-title'>
                        <h2 className='auth-app-title-content'>Study App</h2>
                    </div>
                    <div className='create-body-content'>
                        <h2 className='authentication-title'>Create New Account</h2>
                    </div>
                </div>


                <div className={this.state.create ? 'createAccount-container' : 'hide'}>
                    <form className='createForm-content'>
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='username'
                            name='username'
                            value={this.state.username}
                            required={true}
                            className='authentication-inputField'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='email'
                            name='email'
                            value={this.state.email}
                            required={true}
                            className='authentication-inputField'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='password'
                            name='password'
                            value={this.state.password}
                            required={true}
                            className='authentication-inputField'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='image url'
                            name='image'
                            value={this.state.image}
                            required={false}
                            className='authentication-inputField'
                        />
                        <button className='authentication-btn' onClick={this.createAccount}>Create Account</button>
                    </form>
                </div>

                <div className={this.state.create ? 'hide' : 'login-container'}>
                    <form className='loginForm-content'>
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            placeholder='email'
                            name='email'
                            value={this.state.email}
                            required={true}
                            className='authentication-inputField'
                        />
                        <input 
                            onChange={this.handleChange}
                            type="password"
                            placeholder='password'
                            name='password'
                            value={this.state.password}
                            required={true}
                            className='authentication-inputField'
                        />
                        <button className='authentication-btn' onClick={this.checkLogin}>Login</button>
                    </form>
                </div>

                <div className='below-auth-container'>
                    <h3 className={this.state.create ? '' : 'hide'}>Have an account? <span className='toggle-auth-link' onClick={() => this.toggleLogin()}>Click here to login.</span></h3>
                    <h3 className={this.state.create ? 'hide' : ''}>Need a new account? <span className='toggle-auth-link' onClick={() => this.toggleLogin()}>Click here for new account.</span></h3>
                </div>


            </div>
        );
    }
}

export default Login;