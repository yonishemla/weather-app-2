import React from 'react';
import './Favorites.css';

import { connect } from 'react-redux';
import FavoriteItem from './FavoriteItem';

const Favorites = (props) => {
    if (props.error) {

        return (
            <div>
                <h4 className="no-favorites">Api calls quota has been exceeded!</h4>
            </div>)
    }
    return (
        <div className="favorites-container">
            <h1>Favorites</h1>
            <div className="favorite-container-flex">
                {props.favorites.length > 0 && !props.error && props.favorites.map((city) => {
                    return <FavoriteItem key={city.cityKey} city={city} />
                })}
                {props.favorites.length === 0 && <h4 className="no-favorites">You have no favorites to show...</h4>}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        favorites: state.favorites,
        favoritesLen: state.favorites.length,
        error: state.error
    }
}



export default connect(mapStateToProps)(Favorites)

