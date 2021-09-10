import React, { Component } from 'react';
import PalletCountingListItem from './PalletCountingListItem'
import PropTypes from 'prop-types';
import './components.css';

class PalletCountingList extends Component
{

    /*

    render() {

        return this.props.countings.map((counting) => (
            
            <div>
            <PalletCountingListItem
                key={counting.id} 
                counting={counting}
                Add={this.props.Add}
                Subtract={this.props.Subtract}
                Modify={this.props.Modify}
                department={this.props.department}   
                pallet_type={this.props.pallet_type} 
            />
            </div>
        ))};


            */
        

        render() {

            var dry = new Array(4);            

            for(var i = 0;i < 4;i++)
            {                   
                if(this.props.countings[i] != null)
                {              
                    dry[i] = <PalletCountingListItem key={i} counting={this.props.countings[i]} Add={this.props.Add} Subtract={this.props.Subtract}Modify={this.props.Modify}department={this.props.department}pallet_type={this.props.countings[i].pallet_type} />
                } 
            }    
            return(<div>{dry.map((entry) => entry)}</div>
            )
        }









    

            
        

}

PalletCountingList.propTypes = {

    countings: PropTypes.array.isRequired
}

export default PalletCountingList;