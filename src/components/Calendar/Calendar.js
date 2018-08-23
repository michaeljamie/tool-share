import React, {Component} from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

class Calendar extends Component {
    constructor(){
        super()
        this.state = {
            startDate: null,
            endDate: null,
            datesList: [moment(), moment().add(1, 'days')]
        }


    }

    isDayBlocked = (day) => {
        return true
    }

    

    render(){
        console.log(this.state.startDate, this.state.endDate)

      let datePicker =  <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        isDayBlocked={() => this.isDayBlocked(moment())}
    />

        return(
            <div>
           {datePicker}
            </div>
        )
    }
}

export default Calendar;