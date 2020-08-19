import React from 'react';
import { connect } from 'react-redux';

const DayItem = (props) => {

    const getTempUnits=()=>{
        const maxTemp = props.day.Temperature.Maximum.Value;
        const minTemp = props.day.Temperature.Minimum.Value;
        if (!props.imperialUnitsMode) {
            return parseInt((maxTemp - 32) / 1.8) +'° - ' + parseInt((minTemp - 32) / 1.8)+ '°'
        }
        return maxTemp +'° - ' + minTemp +'°' ;
    }
    
    const weekdays =['Sunaday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return (
        <div className="day-item">
            <h3>{weekdays[new Date(props.day.Date).getDay()]}</h3>
            <div className="day-icon">
                <img src={`https://vortex.accuweather.com/adc2010/images/slate/icons/${props.day.Day.Icon}.svg`} alt="weather icon"/>
            </div>
            <div className="day-temp">
                <p>
                    {getTempUnits()}
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
   
    return {
        imperialUnitsMode: state.imperialUnitsMode
    }
}

export default connect(mapStateToProps)(DayItem)