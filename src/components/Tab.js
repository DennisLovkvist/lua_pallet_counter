import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
    
    ClickHandler = (event) => {

        this.props.ChangeTab(this.props.tab.id)
    }
    render() {

        if(this.props.tab.id === 1)
        {
            return(<div className="count-page-tab-dry"><button onClick={this.ClickHandler.bind(this)}>{this.props.tab.name}</button></div>);
        }
        else if(this.props.tab.id === 2)
        {
            return(<div className="count-page-tab-cold"><button onClick={this.ClickHandler.bind(this)}>{this.props.tab.name}</button></div>);
        }
        else
        {
            return(<div className="count-page-tab-frozen"><button onClick={this.ClickHandler.bind(this)}>{this.props.tab.name}</button></div>);
        }
    }

}

Tab.propTypes = {

    tab: PropTypes.object.isRequired
}

export default Tab;