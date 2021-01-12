import React from 'react';
import MapImage from './northatlanticmap.jpg';
import './Map.css';
import Button from '@material-ui/core/Button';
import LocationDrawer from '../LocationDrawer';

import paris_photo from '../../location_photos/paris.jpg'

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
    //all-containing component
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
    //end of all-containing component
  );
}

/*
WHAT FOLLOWS IS THE TEST DATA FOR THE DUMMY VERSION OF THE LOCATION DRAWER
*/

let testLocation = {
  id: 0,
  locationName: 'Paris',
  description: 'This is a test description of Paris',
  adjacent: [
    { id: 0, name: 'London' },
    { id: 1, name: 'Berlin' },
  ],
  image: paris_photo,
};

//TODO
let setLocation = () => {};

/*
WHAT FOLLOWS IS THE EXPORTED FUNCTION, WHICH TESTS THE DUMMY VERSION OF THE LOCATION DRAWER
*/

function SuperParent(){
  if(true){
    return(
      <div>
        <ParentMap />
        <LocationDrawer location={testLocation} setLocation={setLocation} />
      </div>
    );
  }
  else{
    return(
      <div>
        <ParentMap />
      </div>
    );
  }
  
}

export default SuperParent;
