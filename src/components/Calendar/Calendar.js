import React, {Component} from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import axios from 'axios';

class Calendar extends Component {
    constructor(){
        super()
        this.state = {
            startDate: null,
            endDate: null,
            datesList: []
        }


    }

   getDates = (tool_id) => {
    axios.get(`/api/dates/${tool_id}`)
    .then(res=>{
        var dates = [];
       for(let i=0; i<res.data.length; i++){
           let start = res.data[i].pickup_date
           let end = res.data[i].return_date

            
            var currDate = moment(start).startOf('day');
            var lastDate = moment(end).startOf('day');

            do {
                
                dates.push(currDate.format("MM/DD/YYYY"));
            } while(currDate.add(1, 'days').diff(lastDate) <= 0) 
       }
       this.setState({
           datesList: [...dates]
        })
    })

   }

   isDayBlocked = () => {
       const {datesList} = this.state;
       return datesList
   }
    

    render(){
       this.getDates(this.props.tool_id)

      let datePicker =  <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        isDayBlocked={this.isDayBlocked}
    />

        return(
            <div>
           {datePicker}
            </div>
        )
    }
}

export default Calendar;