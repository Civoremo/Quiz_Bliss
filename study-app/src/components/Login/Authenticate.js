import React from 'react';
import Login from './Login';
import Create from './Create';

const authenticateHOC = App =>
    class extends React.Component {
        constructor() {
            super();
            this.state = {
                loggedIn: false,
                createdAccount: false,
                userToken: '',
            }
        }


        componentDidMount() {
            if(!localStorage.getItem('token')) {
                this.setState({
                    loggedIn: false,
                    createdAccount: false,
                });
            } 
            else if(localStorage.getItem('token') && !localStorage.getItem('userToken')) {
                this.setState({
                    loggedIn: false,
                    createdAccount: true,
                });
            }
            else if (localStorage.getItem('token') === localStorage.getItem('userToken')) {
                this.setState({
                    loggedIn: true,
                    createdAccount: true,
                });
            }
            else {
                console.log(`authentication page  loggedIn:${this.state.loggedIn}  createdAccount: ${this.state.createdAccount}`);
                console.log(`registeredToken:${localStorage.getItem('token')}`);
                console.log(`userToken:${localStorage.getItem('userToken')}`);
            }
        }

        render() {
            if(this.state.loggedIn) {
                return <App />
            } 
            else if(this.state.createdAccount) {
                return <Login />
            }
            else {
                return <Create />
            }
        }

    };

export default authenticateHOC;