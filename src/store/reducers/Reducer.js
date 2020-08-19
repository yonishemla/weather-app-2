
const initialState = {
    currentConditions: {},
    fiveDaysWeather: {},
    suggestions: [],
    cityName: '',
    loading: true,
    favorites: JSON.parse(localStorage.getItem('favorite-cities')) ? JSON.parse(localStorage.getItem('favorite-cities')): [],
    error: null,
    imperialUnitsMode: false,
    nightMode: false,
}

const mainReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case 'SET_SEARCH_VALUE':
            return {
                ...newState,
                searchValue: action.data
            }
        case 'GET_SUGGESTIONS':
            return {
                ...newState,
                suggestions: action.data
            }
        case 'GET_FIVE_DAYS_WEATHER':
            return {
                ...newState,
                fiveDaysWeather: action.data.weather,
                cityName: action.data.cityName,
                loading: false
            }
        case 'GET_CURRENT_CONDITIONS':
            return {
                ...newState,
                currentConditions: action.data
            }
        case 'LOADING':
            return {
                ...newState,
                loading: true
            }
        case 'ERROR':
            return {
                ...newState,
                error: action.data
            }
        case 'CHANGE_UNITS':
            return {
                ...newState,
                imperialUnitsMode: !newState.imperialUnitsMode
            }
        case 'CHANGE_NIGHT_MODE':
            return {
                ...newState,
                nightMode: !newState.nightMode
            }
        case 'ADD_TO_FAVORITES':
            newState.favorites.push(action.data)
            localStorage.setItem('favorite-cities',JSON.stringify(newState.favorites));
            return {
                ...newState
            }
        case 'REMOVE_FROM_FAVORITES':
            let index = newState.favorites.findIndex(city => city.cityKey === action.data)
            newState.favorites.splice(index, 1);
            localStorage.setItem('favorite-cities',JSON.stringify(newState.favorites));
            return {
                ...newState
            }

        default:
            return newState;
    }
}

export default mainReducer