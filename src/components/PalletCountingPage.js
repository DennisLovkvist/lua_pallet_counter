import React, { Component } from 'react';
import PalletCountingList from './PalletCountingList'
import PropTypes from 'prop-types';
import Tabs from './Tabs'
import Common from '../Common';
import './components.css';

class PalletCountingPage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            countings: [],
            counting_control: {},
            customer: {},
            departments: [],
            selected_tab: 1,
        }
    }
    componentDidMount() {

        fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetDepartments')
            .then(res => res.json())
            .then(json => {
                this.setState(

                    { departments: json },

                )
            });

            fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/StartCounting/' + this.props.customer_id)
            .then(res => res.json())
            .then(json => {
                if(json.length !== 0)
                {                   
                    this.setState(
                        { countings: json },
                    )      
                    
                    fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetCountingControlById/'+this.state.countings[0].counting_control_id)
                    .then(res => res.json())
                    .then(json => {

                        if(json.length !== 0)
                        {           
                            this.setState(    
                                { counting_control: json[0] },    
                            )                  
                        }
                        
                    });                   

                }
                else
                {

                }
            });
            fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/GetCustomerById/'+this.props.customer_id)
                .then(res => res.json())
                .then(json => {

                    if(json.length !== 0)
                    {                   
                        this.setState(    
                            { customer: json[0] },    
                        )                  
                    }

                    
                });



    }
    GetCurrentDateString = () => {
    
        var today = new Date();    

        var y = today.getFullYear();
        var m = (today.getMonth() + 1);
        var d = today.getDate();

        var date = y + '-' + ((m < 10) ? "0":"") + m + '-' + ((d < 10) ? "0":"") + d;

        return ('"' + date.toString().split("-").join("") + '"');
    }

    Subtract = (id, department) => {

        if(!this.IsSubmitted())
        {
            this.setState({
                countings: this.state.countings.map(counting => {
                    if (counting.id === id) {
                        counting.count--;
                    }

                    return counting;
                })
            })
        }
    }
    Add = (id, department) => {

        if(!this.IsSubmitted())
        {
            this.setState({
                countings: this.state.countings.map(counting => {
                    if (counting.id === id) 
                    {
                        counting.count++;
                    }
                    
                    return counting;
                })
            })
        }
    }
    Modify = (id, department, input_value) => {

        if(!this.IsSubmitted())
        {
            this.setState({
                countings: this.state.countings.map(counting => {
                    if (counting.id === id) 
                    {
                        counting.count = input_value;
                    }


                    return counting;
                })
            })
        }
    }
    Mark = () => {           

        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    counting_control_id: this.state.counting_control.id,
                    status_id: 3,
                    done_dry: true,
                    done_cold: true,
                    done_frozen: true,
                    done_global: true,
                })
            };      
            fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateCountingControlById', request_options).then(response => {
                    
                if(response.status === 200)
                {            
                    this.setState({
                        counting_control: {
                          ...this.state.counting_control,    
                          status_id: 3,                      
                          done_dry: true,
                          done_cold: true,
                          done_frozen: true,
                          done_global: true
                        },
                      });
                }
            });

    }
    ChangeTab = (id) => {

        if(id != this.state.selected_tab)
        {
            this.setState({ selected_tab: id });
            
        }

    }
    
    ClickHandler = (event) => {

        this.props.GoToCustomerPage();
    }
    IsSubmitted = () => {

        return this.state.counting_control.status_id > 2;
    }
    
    render(){

        var name = (typeof this.state.customer.name === 'string') ? Common.StringLimitLength(this.state.customer.name,20) : "Not Found";
        var customer_number = this.state.customer.number;
        let departments_css = ["global","dry","cold","frozen"];        
        //var mark_button_style = "count-mark-" + departments_css[this.state.selected_tab];

        let departments = this.state.departments;

        for(var i = 0; i < departments.length;i++)
        {
            if(departments[i].name === "Dry")
            {
                departments[i].display_name = "Kolonial";
            }
            else if(departments[i].name === "Cold")
            {
                departments[i].display_name = "Kylen";
            }
            else if(departments[i].name === "Frozen")
            {
                departments[i].display_name = "Frysen";
            }
        }

        return (

            <div>
                <div className="lol">
                    <button onClick={this.ClickHandler.bind(this)}>Tillbaka</button>
                    
                    <h3>{customer_number}</h3>
                    <p>{name}</p>
                    <h4>{this.state.customer.max_height}</h4>
                    
                   
                </div>
                <Tabs tabs={this.state.departments} 
                    ChangeTab={this.ChangeTab} 
                    />
                <div>
                    
                </div>
                <div>

                    <PalletCountingList
                        countings={this.state.countings.slice((this.state.selected_tab - 1) * 4, ((this.state.selected_tab-1) * 4) +4)}
                        Add={this.Add}
                        Subtract={this.Subtract}
                        Modify={this.Modify}
                        department={this.state.selected_tab}
                    />
                
                    <PalletCountingList
                        countings={this.state.countings.slice(12, 16)}
                        Add={this.Add}
                        Subtract={this.Subtract}
                        Modify={this.Modify}
                        department={4}
                    />
                </div>
                
                <div className={this.IsSubmitted() ? "count-mark-active":"count-mark-inactive"}>
                    
                    {!this.IsSubmitted() ? 
                    
                        <button onClick={this.Mark.bind(this)}>Klarmarkera</button> :                          
                        <button onClick={this.Mark.bind(this)}>Klarmarkerad</button>
                    }
                    
                    
                </div>
                
                <div className="count-footer">
                   
                    
                </div>

            </div>
        );
    }

}

PalletCountingPage.propTypes = {

    customer_id: PropTypes.number.isRequired
}

export default PalletCountingPage;