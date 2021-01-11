import React from 'react';
import MapImage from './northatlanticmap.jpg';
import './Map.css';
import Button from '@material-ui/core/Button';

function WorldMap() {
  return <img src={MapImage} alt="Logo" resizeMode="cover" />;
}

function ParentMap() {

/*HERE BEGINS THE FUNCTION THAT FIRES WHEN THE BUTTONS ARE PRESSED*/

  const handleButton = (location) => {
    console.log(location);
  };

/*END OF FUNCTION THAT FIRES WHEN THE BUTTONS ARE PRESSED*/

  return (
    <div class="mapcontainer">
        <div class="mapfunction">
            {/* <WorldMap /> */}
        </div>
      <div class="londonbutton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButton('London')}
        >
          London
        </Button>
      </div>
      <div class="parisbutton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButton('Paris')}
        >
          Paris
        </Button>
      </div>
      <div class="nycbutton">
        <Button variant="contained" color="primary">
          New York
        </Button>
      </div>
    </div>
  );
}

export default ParentMap;
