import React from 'react';
import { connect } from 'react-redux';
import { fetchQuizzes } from '../actions';

class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {
        this.props.fetchQuizzes();
    }

    render() {
        return (
            <div>Something here</div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        quizzes: state.quizzes,
    };
}

export default connect(
    mapStateToProps,
    { fetchQuizzes }
) (QuizList);