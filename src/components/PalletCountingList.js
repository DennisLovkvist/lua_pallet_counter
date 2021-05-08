import React, { Component } from 'react';
import PalletCountingListItem from './PalletCountingListItem'
import PropTypes from 'prop-types';
import './components.css';

class PalletCountingList extends Component
{

    

    render() {

        return this.props.countings.map((counting) => (
            <div>
            <PalletCountingListItem
                key={counting.id} 
                counting={counting}
                Add={this.props.Add}
                Subtract={this.props.Subtract}
                Modify={this.props.Modify}
                department={this.props.department}
            />
            </div>

           ));
    }

}

PalletCountingList.propTypes = {

    countings: PropTypes.array.isRequired
}

export default PalletCountingList;