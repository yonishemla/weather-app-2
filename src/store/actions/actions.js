import { getSuggestionApi, getFiveDaysWeatherApi, getGeopositionApi, getCurrentConditionsApi } from '../../components/api/acuuweather/acuuweatherActions'

//SUGGESTIONS
const dispatchGetSuggestions = (data) => {
    return { type: 'GET_SUGGESTIONS', data: data }
}
export const getSuggestions = query => {
    return async dispatch => {
        try {
            const result = await getSuggestionApi(query)
            dispatch(dispatchGetSuggestions(result.data))
        } catch (error) {
            dispatch(dispatchError(error))
        }
    }
}

//5 DAYS WEATHER WEATHER
const dispatchGetWeather = (data) => {
    return { type: 'GET_FIVE_DAYS_WEATHER', data: data }
}
export const getFiveDaysWeather = (data) => {
    return async dispatch => {
        dispatch(loading())
        try {
            const result = await getFiveDaysWeatherApi(data.cityKey)
            const getCurrentRes = await getCurrentConditionsApi(data.cityKey);
            dispatch(dispatchCurrentConditions({ cityKey: data.cityKey, weather: getCurrentRes.data[0] }))
            dispatch(dispatchGetWeather({ weather: { ...result.data, cityKey: data.cityKey }, cityName: data.value }))
        } catch (error) {
            dispatch(dispatchError(error))
        }

    }
}

//CURRENT CONDITIONS
const dispatchCurrentConditions = (data) => {
    return { type: 'GET_CURRENT_CONDITIONS', data: data }
}
export const getCurrentConditions = cityKey => {
    return async dispatch => {
        try {
            const result = await getCurrentConditionsApi(cityKey);
            dispatch(dispatchCurrentConditions(result.data))
        } catch (error) {
            dispatch(dispatchError(error))
        }
    }
}


//GEOLOCATION
export const getGeoposition = data => {
    return async dispatch => {
        dispatch(loading())
        try {
            const positionRes = await getGeopositionApi(data);
            const getCurrentRes = await getCurrentConditionsApi(positionRes.data.Key);
            const fiveDaysRes = await getFiveDaysWeatherApi(positionRes.data.Key);
            dispatch(dispatchCurrentConditions({ cityKey: positionRes.data.Key, weather: getCurrentRes.data[0] }))
            dispatch(dispatchGetWeather({ weather: { ...fiveDaysRes.data, cityKey: positionRes.data.Key }, cityName: positionRes.data.LocalizedName }))
        } catch (error) {
            dispatch(dispatchError('Error'))
        }
    }
}


//ADD TO FAVORITES
const dispatchAddToFavorites = (data) => {
    return { type: 'ADD_TO_FAVORITES', data: data }
}
export const addToFavorites = data => {
    return dispatch => {
        dispatch(dispatchAddToFavorites(data));
    }
}

//REMOVE FROM FAVORITES
const dispatchRemoveFromFavorites = (data) => {
    return { type: 'REMOVE_FROM_FAVORITES', data: data }
}
export const removeFromFavorites = data => {
    return dispatch => {
        dispatch(dispatchRemoveFromFavorites(data));
    }
}

//LOADING
const loading = () => {
    return { type: 'LOADING' }
}

//ERROR
const dispatchError = (data) => {
    return { type: 'ERROR', data: data }
}
export const getError = data => {
    return dispatch => {
        dispatch(dispatchError(data));
    }
}

//UNITS
const dispatchUnitsMode = (data) => {
    return { type: 'CHANGE_UNITS' }
}
export const changeUnitsMode = data => {
    return dispatch => {
        dispatch(dispatchUnitsMode());
    }
}

//UNITS
const dispatchNightMode = (data) => {
    return { type: 'CHANGE_NIGHT_MODE' }
}
export const changeNightMode = data => {
    return dispatch => {
        dispatch(dispatchNightMode());
    }
}

