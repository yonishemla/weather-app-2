import React from 'react';
import { connect } from 'react-redux';
import { changeNightMode } from './store/actions/actions';
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Favorites from './components/favorites/Favorites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';



function App(props) {

  
  const [wrapperClass, setWrapperClass] = useState({wrapperClass:'wrapper',isNavToggled:false});

  const toggleNav =() =>
  {
    if (wrapperClass.isNavToggled) {
      window.document.body.classList.remove('overflow-y-hidden');
      setWrapperClass({wrapperClass:'wrapper',isNavToggled:false})
    }
    else{
      setWrapperClass({wrapperClass:'wrapper navbar-show',isNavToggled:true});
      window.document.body.classList.add('overflow-y-hidden');
    }
  }
  const toggleNightMode = () => {
    
      if (!props.nightMode) {
        window.document.body.classList.add('night-mode');
      }
      else{
        window.document.body.classList.remove('night-mode');
      }
      props.changeNightMode()
  }


  return (
    <div>
      <Router>
        <div className={wrapperClass.wrapperClass}>
          <Navbar toggleNightMode={toggleNightMode} toggleNav={toggleNav} />
          <div className="app-container">
            <div className="navbar-toggle">
              <FontAwesomeIcon onClick={toggleNav} icon={faBars}/>
            </div>
            <Route exact path="/" component={Home} />
            <Route exact path="/:cityKey/:cityName" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
          </div>
        </div>
      </Router>
    </div>
  );
}

// export default App;

const mapStateToProps = state => {
   
  return {
      nightMode: state.nightMode,
      images: state.images
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeNightMode: (city) => dispatch(changeNightMode(city)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)