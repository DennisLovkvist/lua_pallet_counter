import React, { Component } from 'react';
import CustomerListItem from './CustomerListItem'
import PropTypes from 'prop-types';

class CustomerList extends Component {



    render() {

        return this.props.customers.map((customer,n) => (
            <CustomerListItem
                key={customer.id}
                customer={customer}
                row={n++}
                GoToCountingPage={this.props.GoToCountingPage}
            />

        ));
    }

}

CustomerList.propTypes = {

    customers: PropTypes.array.isRequired
}

export default CustomerList;
