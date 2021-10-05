import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './components.css';

class PalletCountingListItem extends Component
{

    constructor(props) {
        super(props);
        this.state = {
          translation : {
            Position: "PPL",
            Standard: "P",
            Half: "HP",
            Skrymme: "S",
            Gray: "Grå",
            Wood: "Trä",
            Blue: "Blå",
            Red: "Röd",
          },
          count:this.props.counting.count
        };
      }

    ChangeTB = (event) => {

        var raw = event.target.value.toString();
        this.setState({count:raw})

        var count = parseFloat(event.target.value);

        if(!isNaN(count))
        {  
            if(typeof count == 'number')
            {            
                this.props.Modify(this.props.counting.id,this.props.department, parseFloat(count));            
                this.UpdateCount(parseFloat(count));
            }
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
                this.setState({count:this.props.counting.count})
              }
          });
          
            
      }
    
    Subtract = () =>
    {
        if(this.props.counting.count > 0)
        {
            this.props.Subtract(this.props.counting.id,this.props.department);            
            this.UpdateCount(this.props.counting.count);
        }
    }
    Add = () =>
    {
        this.props.Add(this.props.counting.id,this.props.department);
        this.UpdateCount(this.props.counting.count);
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
        
        var input_type = "tel";
        if(this.props.counting.pallet_type_id === 1)
        {
            input_type = "number";
        }
            return (

                <div className={sheet}>
                    <h1>{this.Translate(this.props.counting.pallet_type_name)}  </h1>                   
                    <button onClick={this.Add}>+</button>      
                    <input type={input_type} value={this.state.count} onChange={this.ChangeTB}/>    
                    <button onClick={this.Subtract}>-</button>
                    
                 </div>   
            );
        

        
    }

}

PalletCountingListItem.propTypes = {

    counting: PropTypes.object.isRequired
}


export default PalletCountingListItem;