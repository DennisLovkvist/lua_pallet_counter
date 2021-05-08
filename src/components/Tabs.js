import React, { Component } from 'react';
import Tab from './Tab'
import PropTypes from 'prop-types';

class Tabs extends Component {



    render() {

        return this.props.tabs.map((tab) => (
            <div>

            <Tab
                key={tab.id}
                tab={tab}
                ChangeTab={this.props.ChangeTab}
                active={this.props.selected_tab === tab.id}
            />

            </div>

        ));
    }

}

Tabs.propTypes = {

    tabs: PropTypes.array.isRequired
}

export default Tabs;