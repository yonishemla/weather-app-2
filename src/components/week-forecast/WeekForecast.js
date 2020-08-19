import React from 'react';
import { connect } from 'react-redux';
import { addToFavorites,removeFromFavorites } from '../../store/actions/actions';
import './WeekForecast.css';
import DayItem from './DayItem';
import loader from '../../images/loader3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeekForecast = (props) => {
    toast.configure({
        position:"top-center",
        autoClose: 4000,
        draggable: false,
        hideProgressBar: true
    })

    const getTempUnits=()=>{
        const temp = props.currentConditions.Temperature.Imperial.Value
        if (!props.imperialUnitsMode) {
            return parseInt((temp - 32) / 1.8) +' C°'
        }
        return temp +' F°';
    }

    const addToCityToFavorites = () => {
        props.addToFavorites({ cityName: props.cityName, fiveDaysWeather: props.fiveDaysWeather, cityKey: props.cityKey })
        toast.success(`${props.cityName} was ADDED to favorites`)
    }
    const removeCityFromFavorites = () => {
        props.removeFromFavorites( props.cityKey )
        toast.warn(`${props.cityName} was REMOVED from favorites`)
    }

    if (props.loading && !props.error) {
        return (<div className="loader"><img src={loader} alt="Loader" /></div>)
    }
    if (props.error) {
        return(<div><h2 className="error">Api calls quota has been exceeded!</h2></div>)
    }
    return (
        <div className="week-forecast-container">
            <div className="week-header">
                <div className="header-col felx-col">
                    <div className="favorite-icon">
                        {props.isFavorite !== -1 && 
                            <FontAwesomeIcon className="checked-heart" onClick={removeCityFromFavorites} icon={faHeart} />
                        }
                        {props.isFavorite === -1 && 
                            <FontAwesomeIcon onClick={addToCityToFavorites} icon={faHeart} />
                        }
                        
                    </div>
                    <div>
                        <h2>
                            {props.cityName}
                        </h2>
                        <h4>{new Date(props.currentConditions.LocalObservationDateTime).toDateString()}</h4>
                    </div>
                </div>
                <div className="header-col temp align-center">
                    <h2>Temperature</h2>
                    {getTempUnits()}
                    </div>
                <div className="header-col align-center">
                    <img src={`https://vortex.accuweather.com/adc2010/images/slate/icons/${props.currentConditions.WeatherIcon}.svg`} alt="Weather icon" />
                    <h3>{props.currentConditions.WeatherText}</h3>
                </div>
            </div>
            <div className="divider">
                {props.dayDescription.Text}
            </div>
            <div className="days-container">
                {props.fiveDaysWeather.map((day, index) => {
                    return <DayItem key={index} day={day} />
                })}

            </div>
        </div>
    );
}

const mapStateToProps = state => {
   
    return {
        fiveDaysWeather: state.fiveDaysWeather.DailyForecasts,
        dayDescription: state.fiveDaysWeather.Headline,
        cityName: state.cityName,
        cityKey: state.fiveDaysWeather.cityKey,
        loading: state.loading,
        currentConditions: state.currentConditions.weather,
        isFavorite: state.favorites.findIndex(city=>city.cityKey===state.fiveDaysWeather.cityKey),
        error: state.error,
        imperialUnitsMode: state.imperialUnitsMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToFavorites: (city) => dispatch(addToFavorites(city)),
        removeFromFavorites: (cityKey) => dispatch(removeFromFavorites(cityKey))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WeekForecast)
