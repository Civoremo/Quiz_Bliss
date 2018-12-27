import React from 'react';
import { connect } from 'react-redux';
import { checkAnswer } from '../actions';

import '../styles/TournamentQuizQuestions.css';

class TournamentQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: [],
        }
    }

    // componentDidUpdate = prevState => {
    //     if(this.props.checking !== prevState.checking) {
    //         if(!prevState.checking) {
    //             filtered = this.props.checkedAnswers.filter(answer => {
    //                 if(answer.quizID === this.props.quizId && answer.questionIndex === this.props.index) {
    //                     // console.log(answer)
    //                     return answer
    //                 } else {
    //                     return null;
    //                 }
    //             })
    //             this.setState({
    //                 answer: filtered,
    //             });
    //         }
    //     }
    // }
    


    render() {
        // console.log(this.state.answer)   
        return <div>
            {/* {console.log('it made it here')} */}
            {(this.props.index + 1) * 200}
            </div> 

        // if(this.state.answer.correct !== undefined) {
        //     if(this.state.answer.correct === true) {
        //         // console.log('answered correct   ' + this.state.filteredAnswer)
        //         return (
        //             <div className='questionPlaceholder-answeredTrue'>
        //                 {(this.props.index + 1) * 200}
        //             </div>
        //         );
        //     }
        //     else if (this.state.answer.correct === false) {
        //         // console.log('answered wrong   ' + this.state.filteredAnswer)
        //         return (
        //             <div className='questionPlaceholder-answeredFalse'>
        //                 {(this.props.index + 1) * 200}
        //             </div>
        //         );
        //     }
        //     else {
        //         console.log('nothing found   ' + this.state.answer)
        //         return (
        //             <div className='questionPlaceholder'>
        //                 {(this.props.index + 1) * 200}
        //             </div>
        //         );
        //     }  
        // } else {
        //     return (
        //         <div className='questionPlaceholder'>
        //             {(this.props.index + 1) * 200}
        //         </div>
        //     );
        // }  
    }
}

const mapStateToProps = state => {
    return {
        fetchingQuestions: state.fetchingQuestions,
        checkedAnswers: state.checkedAnswers,
        checking: state.checkingAnswer,
    }
}

export default connect(
    mapStateToProps, 
    { checkAnswer }
)(TournamentQuestions);