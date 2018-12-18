import React from 'react';
// import { connect } from 'react-redux';
import '../styles/CarouselQuizzes.css';

class CarouselQuizzes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render () {
        return (
            <div>
                <h3 className='popular-title'>Popular Quizzes</h3>
                <div className='carouselQuizzes-container'>
                    {this.props.popularQuizzes.map(popQuiz => {
                        return (
                            <div className='popQuiz-container' key={popQuiz.id}>
                                <div className='popQuiz-infoText-content clipText'>
                                    {`Title: `} <span className='popQuiz-infoText'>{popQuiz.title}</span>
                                </div>
                                {/* <div className='popQuiz-infoText-content'>
                                    {`Description: `} <span className='popQuiz-infoText'>{popQuiz.description}</span>
                                </div> */}
                                <div className='popQuiz-infoText-content clipText'>
                                    {`Author: `} <span className='popQuiz-infoText'>{popQuiz.author}</span>
                                </div>
                                <div className='popQuiz-infoText-content clipText'>
                                    {`Topic: `} <span className='popQuiz-infoText'>{popQuiz.topic}</span>
                                </div>
                                <div className='popQuiz-infoText-content clipText'>
                                    {`Votes: `} <span className='popQuiz-infoText'>{popQuiz.votes}</span>
                                </div>
                                <div>
                                    <button className='popQuiz-learnMore-btn' onClick={() => this.props.history.push(`/view/${popQuiz.id}`)}>Learn More</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
        );
    }
}

export default CarouselQuizzes;