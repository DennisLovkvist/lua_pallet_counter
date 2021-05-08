import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './customer_list_page.css';

class CustomerListItem extends Component {

    render() {
        const {customer_name,customer_number,customer_id} = this.props.customer;
        return (
            <div className={(this.props.row % 2 === 0) ? "customer_list_item_even":"customer_list_item_odd"}>
                <div>
                    <h1>{customer_name + " (" + customer_number + ")"}</h1><button onClick={this.props.GoToCountingPage.bind(this, customer_id)}>Continue</button>                    
                 </div>
            </div>
        );
    }

}

CustomerListItem.propTypes = {

    customer: PropTypes.object.isRequired
}


export default CustomerListItem;