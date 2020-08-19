import { endPoints,apiKey } from './config';
import axios from 'axios';

export const getGeopositionApi= (position) =>{
    return axios.get(endPoints.geoposition+position)
}


export const getFiveDaysWeatherApi= (cityKey) =>{
    return axios.get(endPoints.locationKey+cityKey+`?apikey=${apiKey}`)
}
export const getSuggestionApi = (query) =>{
    return axios.get(endPoints.autocompleteSearch+query)
}

export const getCurrentConditionsApi = (cityKey) =>{
    return axios.get(endPoints.currentConditions+cityKey+`?apikey=${apiKey}`)
}