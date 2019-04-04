import React from 'react';
import Login from './Login';

const authenticateHOC = App =>
    class extends React.Component {
        constructor() {
            super();
            this.state = {
                loggedIn: false,
            }
        }


        componentDidMount() {
            if(!localStorage.getItem('userToken')) {
                this.setState({
                    loggedIn: false,
                });
            } 
            else {
                if(localStorage.getItem('userToken')) {
                    this.setState({
                        loggedIn: true,
                    });
                }
            }
        }
        

        login = () => {
            this.setState({
                loggedIn: true,
            });
        }

        logout = event => {
            event.preventDefault();
            this.setState({
                loggedIn: false,
            });
            localStorage.removeItem('username');
            localStorage.removeItem('userToken');
        }

        render() {
            if(this.state.loggedIn) {
                return <App logout={this.logout}/>
            } 
            else if(!this.state.loggedIn) {
                return <Login login={this.login}/>
            }
        }

    };

export default authenticateHOC;