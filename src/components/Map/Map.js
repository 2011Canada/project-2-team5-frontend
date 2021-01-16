import React, { useState } from 'react';
// import MapImage from './worldmap.jpg';
import './Map.css';
import Button from '@material-ui/core/Button';
import LocationDrawer from './LocationDrawer';

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

  /*END OF FUNCTION THAT FIRES WHEN THE BUTTONS ARE PRESSED*/

  return (
    //all-containing component
    <div className="mapcontainer">
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

/*
WHAT FOLLOWS IS THE TEST DATA FOR THE DUMMY VERSION OF THE LOCATION DRAWER
*/

/*
WHAT FOLLOWS IS THE EXPORTED FUNCTION, WHICH TESTS THE DUMMY VERSION OF THE LOCATION DRAWER
*/

function SuperParent() {
  if (true) {
    return (
      <div>
        <ParentMap />
      </div>
    );
  } else {
    return (
      <div>
        <ParentMap />
      </div>
    );
  }
}

export default SuperParent;
