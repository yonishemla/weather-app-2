import React from 'react';
import { useState, useEffect } from 'react'
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import WeekForecast from '../week-forecast/WeekForecast';
import { connect } from 'react-redux';
import { getSuggestions,getFiveDaysWeather,getGeoposition,getCurrentCondition } from '../../store/actions/actions';

const Home = (props) => {

    const [homeState, setHomeState] = useState({ searchValue: ''});
    useEffect(() => {
        
        if (props.match.params.cityKey && props.match.params.cityName) {
            props.getFiveDaysWeather({
                cityKey: props.match.params.cityKey,
                value: props.match.params.cityName
            })
        }
        else if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                props.getGeoposition(position.coords.latitude + ',' + position.coords.longitude)
            });
        }
    },[])

    const search = (data) => {
        setHomeState({ searchValue: data.value});
        props.getFiveDaysWeather(data);
        
    }

    const getSuggestions = (event) => {
        setHomeState({searchValue: event.target.value});
        props.getSuggestions(event.target.value);
    }
   
    return (

        <div>
            <div className="search-container">
                <div className="flex-container">
                <FontAwesomeIcon className="arrow-back" icon={faArrowLeft} />
                    <div className="input-container">                 
                        <input value={homeState.searchValue} onChange={getSuggestions} placeholder="Search a city..." />
                    </div>
                    <FontAwesomeIcon icon={faSearch} />
                    {props.suggestions.length > 0 && homeState.searchValue !== '' &&
                        <div className="suggestions-container">
                            <ul>
                                {props.suggestions.map((city) => {
                                    return <li key={city.Key} onTouchStart={() => search({cityKey:city.Key,value:city.LocalizedName})} onMouseDown={() => search({cityKey:city.Key,value:city.LocalizedName})}><FontAwesomeIcon icon={faSearch} /> {`${city.LocalizedName}, ${city.Country.LocalizedName}`}</li>
                                    
                                })}
                            </ul>
                        </div>
                    }
                </div>
            </div>
            <WeekForecast/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        suggestions: state.suggestions,
        fiveDaysWeather: state.fiveDaysWeather,
        searchValue: state.searchValue,
        favorites: state.favorites,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSuggestions: (query) => dispatch(getSuggestions(query)),
        getFiveDaysWeather: (data) => dispatch(getFiveDaysWeather(data)),
        getGeoposition: (data) => dispatch(getGeoposition(data)),
        getCurrentCondition: (cityKey) => dispatch(getCurrentCondition(cityKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
