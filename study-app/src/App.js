import React, { Component } from 'react';
import './styles/App.css';
import './styles/reset.css';
import { Link, NavLink, Route } from 'react-router-dom';
import authenticateHOC from './components/Login/Authenticate';

import QuizList from './components/QuizList';
import CreateNewQuiz from './components/CreateNewQuiz';
import ViewQuizCard from './components/ViewQuizCard';

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

  closeAllDropdowns = () => {
    this.setState({
      menu: false,
      profile: false,
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
                {/* <Link to='/' className='menu-links' onClick={() => this.closeAllDropdowns()}>Home</Link> */}
                <Link to='/' className='menu-links' onClick={() => this.closeAllDropdowns()}>Quiz Collection</Link>
              </div>
            </div>

            <NavLink exact to='/' onClick={() => this.closeAllDropdowns()}><div className='nav-logo'>STUDY APP</div></NavLink>
            
            <div className='profile-container'>
              <div className='nav-profile-container'>
                <img src={!localStorage.getItem('userImg') || localStorage.getItem('userImg') === null ? "https://bit.ly/2C9tLJe" : `${localStorage.getItem('userImg')}`} alt="profile" className='profile-image'/>
                <span className={this.profile ? `nav-items profileActive` : 'nav-items'} onClick={() => this.toggleProfile()}>{localStorage.getItem('username')}</span>
              </div>
              <div className={this.state.profile ? 'profile-dropdown-container' : 'profileActive'}>
                <Link to='/profile' className='menu-links' onClick={() => this.closeAllDropdowns()}>Profile</Link>
                  <Link to='/' className='menu-links' onClick={this.props.logout}>Logout</Link>
              </div>
            </div>
          </nav>
        </div>

        

        <div className='all-quiz-container'>
        <Route exact path='/' render={props => <QuizList {...props} />} />
          {/* <QuizList /> */}
        <Route path='/create new quiz' render={props => <CreateNewQuiz {...props} />} />
        <Route exact path='/view/:quizId' render={props => <ViewQuizCard {...props} />} />
        </div>
      </div>
    );
  }
}

export default authenticateHOC(App);
