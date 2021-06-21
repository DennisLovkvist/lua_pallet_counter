import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './customer_list_page.css';

class CustomerListItem extends Component {

    render() {
        const {customer_name,customer_number,customer_id} = this.props.customer;

        var customer_name_adjusted = customer_name;

        if(customer_name.length > 24)
        {
            customer_name_adjusted = customer_name.substring(0,21) + "...";
        }

        return (
            <div className={(this.props.row % 2 === 0) ? "customer_list_item_even":"customer_list_item_odd"}>
                <div>
                    <h1>{"(" + customer_number + ") "}<h2>{customer_name_adjusted}</h2></h1><button onClick={this.props.GoToCountingPage.bind(this, customer_id)}>Fortsätt</button>                    
                 </div>
            </div>
        );
    }

}

CustomerListItem.propTypes = {

    customer: PropTypes.object.isRequired
}


export default CustomerListItem;