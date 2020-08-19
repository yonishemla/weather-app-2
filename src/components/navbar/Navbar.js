import React from 'react';
import { connect } from 'react-redux';
import { changeUnitsMode } from '../../store/actions/actions';
import { Link } from "react-router-dom";
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun,faHome,faHeart,faTemperatureHigh,faMoon } from '@fortawesome/free-solid-svg-icons';


const Navbar = (props) => {
    const changeUnits=()=>{
        props.changeUnitsMode();
    }
    const toggleNightMode=()=>{
        props.toggleNightMode();
    }
    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-header">

                <div className="icon-container"><FontAwesomeIcon icon={faCloudSun} /></div>
                   Herolo Weather

                </div>
                <ul>
                    <li><Link onClick={props.toggleNav} to="/"><div className="icon-container"><FontAwesomeIcon icon={faHome} /></div>Home</Link></li>
                    <li><Link onClick={props.toggleNav} to="/favorites" ><div className="icon-container"><FontAwesomeIcon icon={faHeart} /></div>Favorites</Link></li>
                  </ul>
                  <ul className="switches">  
                    <li className="switch-btn"><div className="icon-container"><FontAwesomeIcon icon={faTemperatureHigh} /></div>Celsius mode <div className="switch"><input onChange={changeUnits} id="switch" type="checkbox"/><label htmlFor="switch"></label></div></li>
                    <li className="switch-btn"><div className="icon-container"><FontAwesomeIcon icon={faMoon} /></div>Night mode <div className="switch"><input onChange={toggleNightMode} id="switch2" type="checkbox"/><label htmlFor="switch2"></label></div></li>
                </ul>
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
        changeUnitsMode: () => dispatch(changeUnitsMode()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)