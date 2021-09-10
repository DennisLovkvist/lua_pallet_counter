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

        if(!this.DepartmentSubmitted(department))
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

        if(!this.DepartmentSubmitted(department))
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

        if(!this.DepartmentSubmitted(department))
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
    Mark = (department) => {     
         
        const cc = this.state.counting_control;
        var done = [cc.done_global,cc.done_dry,cc.done_cold,cc.done_frozen];
        done[department] = !done[department];

        this.setState({
            counting_control: {
              ...this.state.counting_control,
              done_global: done[0],
              done_dry: done[1],
              done_cold: done[2],
              done_frozen: done[3],
              status_id : (done[0]&&done[1]&&done[2]&&done[3]) ? 4: this.state.counting_control.status_id
            },
          });



    }
    ChangeTab = (id) => {

        this.setState({ selected_tab: id })

    }
    Save = (id) => {

        var ids = [];
        var counts = [];

        for (var i = 0; i < this.state.countings.length; i++) {
            ids.push(this.state.countings[i].id);
            counts.push(this.state.countings[i].count);
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    ids: ids,
                    counts: counts
                })
        };

        fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateCountings', requestOptions)
            .then(res => res.json())
            .then(json => {

                console.log(json)

            })

        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    status_id: this.state.counting_control.status_id,
                    done_dry:this.state.counting_control.done_dry,
                    done_cold:this.state.counting_control.done_cold,
                    done_frozen:this.state.counting_control.done_frozen,
                    done_global:this.state.counting_control.done_global
                })
        };

        fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateCountingControlById/'+ this.state.counting_control.id, request_options)
        .then(res => res.json())
        .then(json => {

            console.log(json)

        })

        this.props.GoToCustomerPage();
        
    }
    ClickHandler = (event) => {

        this.props.GoToCustomerPage();
    }
    DepartmentSubmitted = (tab) => {

        switch(tab)
        {
            case 0:
                return this.state.counting_control.done_global;
            case 1:
                return this.state.counting_control.done_dry;
            case 2:
                return this.state.counting_control.done_cold;
            case 3:
                return this.state.counting_control.done_frozen;
            default:
                return false;
        }
    }
    
    render(){

        var name = (typeof this.state.customer.name === 'string') ? Common.StringLimitLength(this.state.customer.name,20) : "Not Found";
        var customer_number = this.state.customer.number;
        let departments_css = ["global","dry","cold","frozen"];        
        var mark_button_style = "count-mark-" + departments_css[this.state.selected_tab];

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
 //<button onClick={this.Save.bind(this,this.state.customer_id)}>Spara</button>
        console.log(this.state.customer);       
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
                <div className={mark_button_style}>

                {!this.DepartmentSubmitted(this.state.selected_tab) ? 
                    
                    <button onClick={this.Mark.bind(this,this.state.selected_tab)}>Skicka</button> :  
                    <button onClick={this.Mark.bind(this,this.state.selected_tab)}>Skickad</button>
                }
                    
                </div>
                    <PalletCountingList
                        countings={this.state.countings.slice(12, 16)}
                        Add={this.Add}
                        Subtract={this.Subtract}
                        Modify={this.Modify}
                        department={0}
                    />
                </div>
                <div className="count-mark-global">
                    
                    {!this.DepartmentSubmitted(0) ? 
                    
                        <button onClick={this.Mark.bind(this,0)}>Skicka</button> :                          
                        <button onClick={this.Mark.bind(this,0)}>Skickad</button>
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