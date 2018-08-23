import React, {Component} from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Calendar extends Component {
    constructor(){
        super()
        this.state = {
            startDate: moment(),
            endDate: moment().add(1, "days"),
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

   componentDidUpdate(prevProps, prevState){
       if(prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate ){   
    this.props.updateCheckoutState(this.state.startDate.format("MM/DD/YYYY"), this.state.endDate.format("MM/DD/YYYY"))
   }
}

   handleChangeStart=(value)=>{
        this.setState({
            startDate: value
        })
   }

   handleChangeEnd=(value)=>{
       this.setState({
           endDate: value
       })  
   }

    

    render(){
       this.getDates(this.props.tool_id)
       

        return(
            <div className='calendar-dates'>
            <div className='calendar-start'>
            Pick-up
            <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={(e)=>this.handleChangeStart(e)}
                dateFormat={"MM/DD/YYYY"}
                excludeDates={this.state.datesList}
                />
            </div>
            <div className='calendar-end'>
            Return
            <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={(e)=>this.handleChangeEnd(e)}
                dateFormat={"MM/DD/YYYY"}
                excludeDates={this.state.datesList}
            />
            </div>
            </div>
        )
    }
}

export default Calendar;