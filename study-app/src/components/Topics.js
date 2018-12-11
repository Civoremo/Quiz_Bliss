import React from 'react';

class Topics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className='topic-text'>{this.props.topic}</div>
        );
    }

}

export default Topics;