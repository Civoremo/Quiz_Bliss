import React from 'react';

class Topics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <option className='topic-text'>{this.props.topic}</option>
        );
    }

}

export default Topics;