import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './components.css';

class PalletCountingListItem extends Component
{

    constructor(props) {
        super(props);
        this.state = {
          count: props.counting.count
        };
      }

    myChangeHandler = (event) => {

        var n = parseInt(event.target.value);

        if(!isNaN(n))
        {
            this.setState({
                count: n
            });

            this.props.Modify(this.props.counting.id,this.props.department, this.state.count);
        }
            
    }
    Subtract = () =>
    {
        if(this.state.count > 0)
        {
            this.setState({
                count: parseInt(this.state.count)-1
            });
            this.props.Subtract(this.props.counting.id,this.props.department);
        }
    }
    Add = () =>
    {
        this.setState({
            count: parseInt(this.state.count)+1
        });
        this.props.Add(this.props.counting.id,this.props.department);
    }
    render()
    {
        const {id} = this.props.counting;

        let departments = ["global","dry","cold","frozen"];
        
        //For alternating colors
        var sheet = "count-list-item-" + departments[this.props.department] + ((((this.props.department % 2)+id)%2 === 0) ? "-even":"-even");
        
            return (

                <div className={sheet}>
                    <h1>{this.props.counting.pallet_type_name}  </h1>                   
                    <button onClick={this.Add}>+</button>      
                    <input type="tel" value={this.state.count} onChange={this.myChangeHandler}/>    
                    <button onClick={this.Subtract}>-</button>
                    
                 </div>   
            );
        

        
    }

}

PalletCountingListItem.propTypes = {

    counting: PropTypes.object.isRequired
}


export default PalletCountingListItem;