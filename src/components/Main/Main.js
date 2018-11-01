import React, {Component} from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import moment from 'moment';
import swal from 'sweetalert2';

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Box = styled.div`
    border: 2px solid black;
`

class Main extends Component {
    constructor(){
        super()
        this.state = {
            info: [],
            date: new Date(),
            selectedWeek: [],
            
        }
        
    }
    handleChange = (date) => {
        this.setState({ date });
        this.selectWeek(date);
    }

    // handleDayChange = (e) => {
    //     this.setState({
    //         selectedWeek: e.target.value
    //     })
    // }
    
//fliter anything 0, empty hours
// send to the back end
// insert into the database one by one
// delete previous info for the days (1st)
    addHours = () => {
        //is this where i send week to the back end instead of the days?
        let {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = this.state
        axios.post('/api/addHours', {monday, tuesday, wednesday, thursday, friday, saturday, sunday}).then(res => {
            swal(
                'Success',
                'Your hours have been updated',
                'success'
              )
        })
    }

    componentDidMount(){
        axios.get('/api/previous').then(res => {
            
        });
        axios.get('/api/info').then(res => {
            this.setState({
                info: res.data
            })
        });
        this.selectWeek(this.state.date);
    }

    selectWeek = (date) => {
        var week = [];
        var start = moment(date).startOf('isoweek')._d
        for(let i = 0; i <= 6; i++){
            week.push(start);
            start = moment(start).add(24, 'h')._d
        }
        // console.log(week)
        // this.setState({
        //     selectedWeek: week
        // })
        axios.post('/api/previous', {days: week}).then(res => {
            this.setState({
                selectedWeek: res.data
            })
        })
    }

    updateDayHours(id, hours){
        const newDays = this.state.selectedWeek.map((day) => {
            if(id === day.id){
                day.hours = hours;
            }
            return {...day};
        })
        this.setState({selectedWeek: newDays})
    }


    render(){

        console.log(this.state.date)
       
        let infoDisplay = this.state.info.map((el, i) => {
            return (
                <div key={i}>
                    <h3>{el.first_name} {el.last_name}</h3>
                    
                    <h4>{el.email}</h4>
                    <h4>{el.phone_numbers}</h4>
                   {/* <h5>Last submitted Hours: {el.hours}</h5> */}
                   
                </div>
            )
        })

        return (
            <Body>
                {infoDisplay}
                <br/>
                <Calendar onChange={this.handleChange} value={this.state.date} />
                <br/>
                <Box>
                    From {moment(this.state.date).startOf('isoweek').format('dddd MM/DD')}  to {moment(this.state.date).endOf('isoweek').format('dddd MM/DD')}
                    <br/>
                    <br/>
                    <table>
                        <tr>
                            <th></th>
                        </tr>
                        <tr>
                            {this.state.selectedWeek.map((day, i) => {
                                console.log(11, day.date)
                                return (
                                    <th key={i} >{moment(day.date).format('ddd MM/DD')}</th>      
                                ) 
                            })}
                            
                        </tr>
                        <tr>
                            {this.state.selectedWeek.map((day,i)=>{
                                return (

                                    <td><input type="text" onChange={(e) => this.updateDayHours(day.id, e.target.value)} value={day.hours}/></td>
                                )
                            })}
                            {/* <td><input type="text" onChange={this.handleTuesday} value={this.state.tuesday} /></td>
                            <td><input type="text" onChange={this.handleWednesday} value={this.state.wednesday} /></td>
                            <td><input type="text" onChange={this.handleThursday} value={this.state.thursday} /></td>
                            <td><input type="text" onChange={this.handleFriday} value={this.state.friday} /></td>
                            <td><input type="text" onChange={this.handleSaturday} value={this.state.saturday} /></td>
                            <td><input type="text" onChange={this.handleSunday} value={this.state.sunday} /></td> */}
                        </tr>
                        {/* <tr>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                        <tr>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                        </tr> */}
                    </table>
                <br/>
                <button onClick={this.addHours}>Add Hours</button>
                <br/>
                <br/>
                </Box>
            </Body>
        )
    }
}
export default Main;