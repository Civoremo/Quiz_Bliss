import React from 'react';
import '../styles/QuizCard.css';

const QuizCard = props => {
    return (
        <div className='quizCard-container'>
            <div className='quizCard-text'>Title: <span className='quizCard-info'>{props.quiz.title}</span></div>
            <div className='quizCard-text'>Author: <span className='quizCard-info'>{props.quiz.author}</span></div>
            <div className='quizCard-text'>Topic: <span className='quizCard-info'>{props.quiz.topic}</span></div>
            <div className='quizCard-text'>Votes: <span className='quizCard-info'>{props.quiz.votes}</span></div>
        </div>
    );

}

export default QuizCard;