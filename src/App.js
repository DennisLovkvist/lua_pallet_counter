import React, { Component } from 'react';
import PalletCountingPage from './components/PalletCountingPage'
import CustomerPage from './components/CustomerPage'
import './App.css';

const Pages = {
    Customers: 'Customers',
    Counting: 'Counting'
}

class App extends Component {

    
   
    constructor(props) {
        super(props);        

        this.state = {
            customer_id: 1,
            page_current: Pages.Customers,
        }
    }

    componentDidMount(){

                
    }    
    GoToCustomerPage = () => {

        this.setState({ page_current: Pages.Customers })
    }
    GoToCountingPage = (id) => {

        fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetCustomerById/' + id)
            .then(res => res.json())
            .then(json => {

                if (json.length > 0) {

                    this.setState({ customer_id: id })
                    this.setState({ page_current: Pages.Counting })
                }

            });
       
    }

    render() {

        if (this.state.page_current === Pages.Customers) {

            return (
                <div>
                        <CustomerPage
                            GoToCountingPage={this.GoToCountingPage}
                        />

                </div>
            );
        }
        else
        {
            return (
                <div>
                        <PalletCountingPage
                        customer_id={this.state.customer_id}
                        GoToCustomerPage={this.GoToCustomerPage}
                        />


                </div>
            );
        }
        
    }

}

export default App;
