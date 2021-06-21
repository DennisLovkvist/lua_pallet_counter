import React, { Component } from 'react';
import CustomerList from './CustomerList'
import './components.css';
import Common from '../Common';

class CustomerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counting_control: [],
            customers_all: [],
            search: "",
            valid_customer_id: "",
        }
    }
    componentDidMount() {

console.log(process.env);
        fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetCustomers')
            .then(res => res.json())
            .then(json => {
                this.setState(

                    { customers_all: json },

                )
            });

        var url_date_string = Common.GetCurrentURLDateString();
        
        fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetCountingControlByDateAndStatus/' + url_date_string + '/3')
            .then(res => res.json())
            .then(json => {
                this.setState(

                    { counting_control: json },

                )
            });

    }
    OnChangeHandler = (event) => {

        this.setState({ search: event.target.value });
    }
    ClickHandler = (event) => {

        var id = this.CustomerIdFromInput(this.state.search);

        if (id !== -1) {

            this.props.GoToCountingPage(id);
        }


    }
    CustomerIdFromInput(input) {

        for (var i = 0; i < this.state.customers_all.length; i++) {

            if (this.state.customers_all[i].number === input) 
            {
                return this.state.customers_all[i].id;
            }
            if(this.state.customers_all[i].name.toString().toLowerCase().match(input.toLowerCase()))
            {

                return this.state.customers_all[i].id;
            }
        }
        return -1;

    }
    render() {
        return (
            <div>
                <div className="customer_page_search_bar">
                <input type="tel" value={this.state.search} onChange={this.OnChangeHandler} />
                <button onClick={this.ClickHandler.bind(this)}>Räkna</button>
                </div>
                <CustomerList
                    customers={this.state.counting_control}
                    GoToCountingPage={this.props.GoToCountingPage}
                />

            </div>
        );
    }

}


export default CustomerPage;
