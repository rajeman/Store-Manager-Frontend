import React from 'react';
import { connect } from 'react-redux';
import { fetchSales } from '../actions/records';
import Record from './Record';

class Records extends React.Component {
    componentDidMount(){
        this.props.dispatch(fetchSales())
    }
    render() {
        const { sales } = this.props;
        return (
            <div class="container">
                <div class="wrapper">
                    <table id="orders-table">
                        <tr>
                            <th>Attendant ID</th>
                            <th>Attendant Name</th>
                            <th>Order Id</th>
                            <th>Time Created</th>
                            <th>Total Item</th>
                            <th>Order Price</th>
                        </tr>
                        {sales.map((sale)=> <Record sale={sale}/>)}
                        
                    </table>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Records); 

