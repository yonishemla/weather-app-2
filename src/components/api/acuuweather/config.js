
// export const apiKey = 'Z4KPevJp0MDfG0b5GDxnJPnda24ExpSS';
// export const apiKey = '5KDgoFfFQE8AvvC8wDSwKlQ3ijGl4GNf';
export const apiKey = 'K4zcP3DlooiaC78THBdmjPtuncNMIVY9';

export const endPoints = {
    geoposition: `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=`,
    locationKey: 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/',
    autocompleteSearch: `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=`,
    currentConditions: `https://dataservice.accuweather.com/currentconditions/v1/`,
};