import React from 'react';

class Authors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className='topic-text'>{this.props.author}</div>
        );
    }

}

export default Authors;