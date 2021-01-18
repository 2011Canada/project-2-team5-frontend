import React, { useState } from 'react';
// import MapImage from './worldmap.jpg';
import './Map.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LocationDrawer from './LocationDrawer';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';

// import paris_photo from '../../location_photos/paris.jpg';
// import { useSelector } from 'react-redux';

// function WorldMap() {
//   return <img src={MapImage} alt="Logo" resizeMode="cover" />;
// }

function ParentMap() {
  /*HERE BEGINS THE FUNCTION THAT FIRES WHEN THE BUTTONS ARE PRESSED*/

  
  const [activeLocation, setActiveLocation] = React.useState(0);
  const [grabbedLocation, setGrabbedLocation] = React.useState(false);

  function handleButton(nextActiveLocation) {
    setActiveLocation(nextActiveLocation);
    setGrabbedLocation(true);
  }

  //TODO: test
  useState(() => {}, [activeLocation]);


  return (
    //all-containing component
    <div className="mapcontainer">
      <div className="description">
        <h1 style={{'paddingLeft':'20px', 'color': 'white'}}>Welcome to Spybook</h1>
        <Paper style={{'padding':'20px 20px 20px 20px', 'backgroundColor': '#55555500', 'color': 'white'}}>
          The only social media platform for spies. Each of the seven marked cities on the map is a possible destination from which you can carry out  
          your nefarious schemes. Click on any of the seven marked cities to see what you can do.
        </Paper>
      </div>

      <div className="mapfunction">
        {/* <WorldMap /> */}
        <LocationDrawer
          activeLocation={activeLocation}
          grabbedLocation={grabbedLocation}
          setGrabbedLocation={setGrabbedLocation}
        />
      </div>

      <div className="torontobutton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButton(2)}
        >
          Toronto
        </Button>
      </div>

      <div className="parisbutton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButton(1)}
        >
          Paris
        </Button>
      </div>

      <div className="vancouverbutton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButton(3)}
        >
          Vancouver
        </Button>
      </div>

      <div className="cairobutton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButton(7)}
        >
          Cairo
        </Button>
      </div>

      <div className="beijingbutton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButton(6)}
        >
          Beijing
        </Button>
      </div>

      <div className="sydneybutton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButton(5)}
        >
          Sydney
        </Button>
      </div>

      <div className="saopaulobutton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButton(4)}
        >
          Sao Paulo
        </Button>
      </div>
    </div>
    //end of all-containing component
  );
}

export default ParentMap;
