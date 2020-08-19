import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { removeFromFavorites, changeUnitsMode,getError } from '../../store/actions/actions';
import { getCurrentConditionsApi, } from '../api/acuuweather/acuuweatherActions';


const FavoriteItem = (props) => {

    const initialState = {
        icon: '',
        text: '',
        temp: '',
        cityName: '',
        cityKey: ''
    }
    const [state, setState] = useState(initialState);

    useEffect(() => {
        getCurrentConditionsApi(props.city.cityKey)
            .then((result) => {
                setState({
                    icon: `https://vortex.accuweather.com/adc2010/images/slate/icons/${result.data[0].WeatherIcon}.svg`,
                    text: result.data[0].WeatherText,
                    temp: result.data[0].Temperature.Imperial.Value,
                    cityName: props.city.cityName,
                    cityKey: props.city.cityKey
                })
            }).catch(err=>props.getError(err))
    }, [])

    const getTempUnits = () => {

        if (!props.imperialUnitsMode) {
            return parseInt((state.temp - 32) / 1.8) + ' C°'
        }
        return state.temp + ' F°';
    }

    const remove = () => {
        props.removeFromFavorites(state.cityKey)
    }

    return (
        <div className="favorite-item-container">
            <Link to={`/${state.cityKey}/${state.cityName}`}>
                <div className="favorite-item-title">
                    <h2>{state.cityName}</h2>
                </div>
                <div className="favorite-item-desc">
                    <h4>{state.text}</h4>
                </div>
                <div className="favorite-item-image">
                    <img src={state.icon} alt="weather icon" />
                </div>
                <div className="favorite-item-temp">
                    <h4>
                        {getTempUnits()}°
                </h4>
                </div>
            </Link>
            <div onClick={remove} className="remove-favorite-icon">
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        imperialUnitsMode: state.imperialUnitsMode,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromFavorites: (cityKey) => dispatch(removeFromFavorites(cityKey)),
        changeUnitsMode: () => dispatch(changeUnitsMode()),
        getError: (err) => dispatch(getError(err)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItem)

