import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './components.css';

class PalletCountingListItem extends Component
{

    constructor(props) {
        super(props);
        this.state = {
          count: props.counting.count,
          translation : {
            Position: "PPL",
            Standard: "P",
            Half: "HP",
            Skrymme: "S",
            Gray: "Grå",
            Wood: "Trä",
            Blue: "Blå",
            Red: "Röd",
          }
        };
      }

    ChangeTB = (event) => {

        var count = parseInt(event.target.value);

        if(isNaN(count))
        {
            count = 0;
        }

        if(typeof count == 'number')
        {
            this.setState({count:parseInt(count)});
            this.props.Modify(this.props.counting.id,this.props.department, parseInt(count));            
            this.UpdateCount(parseInt(count));
        }
            
    }
    UpdateCount = (value) => {
 
        
        const request_options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
              {
                  counting_control_id: this.props.counting.counting_control_id,
                  department: this.props.counting.department_id,
                  pallet_type: this.props.counting.pallet_type_id,
                  value: value,
              })
          };
        console.log(request_options);
    
          fetch('http://' + process.env.REACT_APP_WEB_SERVER_IP + ':8081/UpdateCountingValue', request_options).then(response => {
                  
              if(response.status === 200)
              {
                console.log(value);
                this.setState({count: value});
              }
          });
          
            
      }
    
    Subtract = () =>
    {
        if(this.state.count > 0)
        {
            this.setState({
                count: parseInt(this.state.count)-1
            });
            this.props.Subtract(this.props.counting.id,this.props.department);            
            this.UpdateCount(this.state.count-1);
        }
    }
    Add = () =>
    {
        this.setState({
            count: parseInt(this.state.count)+1
        });
        this.props.Add(this.props.counting.id,this.props.department);
        this.UpdateCount(this.state.count+1);
    }
    Translate = (input) =>
    {
        return this.state.translation[input];
    }
    render()
    {
        const {id} = this.props.counting;

        let departments = ["global","dry","cold","frozen"];
        
        //For alternating colors
        var sheet = "count-list-item-" + departments[this.props.department] + ((((this.props.department % 2)+id)%2 === 0) ? "-even":"-even");
        
            return (

                <div className={sheet}>
                    <h1>{this.Translate(this.props.counting.pallet_type_name)}  </h1>                   
                    <button onClick={this.Add}>+</button>      
                    <input type="tel" value={this.props.counting.count} onChange={this.ChangeTB}/>    
                    <button onClick={this.Subtract}>-</button>
                    
                 </div>   
            );
        

        
    }

}

PalletCountingListItem.propTypes = {

    counting: PropTypes.object.isRequired
}


export default PalletCountingListItem;