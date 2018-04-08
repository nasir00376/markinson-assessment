import React from 'react';
import PropTypes from 'prop-types';
import './Collapsible.css';

class Collapsible extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isExpanded: false,
            height: 0
        }
    }

    handleToggle(e){
        e.preventDefault();
        // console.log(this.refs.inner.clientHeight);
        this.setState({
            isExpanded: !this.state.isExpanded,
            // height: this.refs.inner.clientHeight
        })
    }

    render(){
        const {title, count, children} = this.props;
        const {isExpanded, height} = this.state;
        // const currentHeight = isExpanded ? height : 0;
        return (
            <div className={`drilldown ${isExpanded ? 'is-open' : ''}`}
                 onClick={(e) => this.handleToggle(e)}>
                <button className="accordion">
                    {`${title.replace(/\b\w/g, l => l.toUpperCase())} (${count})`}
                </button>
                <div className="accordion-content">
                    {children}
                </div>
            </div>


        )
    }

}

Collapsible.propTypes = {
    title: PropTypes.string,
};

export default Collapsible;