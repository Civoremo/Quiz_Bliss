import React, { Component } from 'react';
import './styles/App.css';
import './styles/reset.css';
import { Link, NavLink } from 'react-router-dom';
import authenticateHOC from './components/Login/Authenticate';

import QuizList from './components/QuizList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      menu: false,
      profile: false,
    }

  }


  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu,
      profile: false
    });
  }

  toggleProfile = () => {
    this.setState({
      profile: !this.state.profile,
      menu: false
    });
  }


  render() {
    return (
      <div className="App">

        <div className='navigation-div'>
          <nav className='nav-container'>

            <div className='hamburger-container'>
              <span className='nav-items' onClick={() => this.toggleMenu()}>Menu</span>
              <div className={this.state.menu ? 'hamburger-dropdown-container' : 'menuActive'}>
                <Link to='/create new quiz' className='menu-links'>Create New Quiz</Link>
                <Link to='/' className='menu-links'>Quiz Collection</Link>
              </div>
            </div>

            <NavLink exact to='/'><div className='nav-logo'>STUDY APP</div></NavLink>
            
            <div className='profile-container'>
              <div className='nav-profile-container'>
                <img src="https://bit.ly/2EpCYPN" alt="profile" className='profile-image'/>
                <span className={this.profile ? `nav-items profileActive` : 'nav-items'} onClick={() => this.toggleProfile()}>user_name</span>
              </div>
              <div className={this.state.profile ? 'profile-dropdown-container' : 'profileActive'}>
                <Link to='/profile' className='menu-links'>Profile</Link>
                  <Link to='/' className='menu-links'>Logout</Link>
              </div>
            </div>
          </nav>
        </div>

        

        <div className='all-quiz-container'>
          <QuizList />
        </div>
      </div>
    );
  }
}

export default authenticateHOC(App);
