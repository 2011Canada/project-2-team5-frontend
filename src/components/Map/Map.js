import React from 'react';
import MapImage from './northatlanticmap.jpg';
import './Map.css';
import Button from '@material-ui/core/Button';

function WorldMap() {
    return (
    <img src={MapImage} alt="Logo" />
    );
}

function ParentMap() {
    return (
        <div class="mapcontainer">
            <WorldMap/>
            <div class="londonbutton">
                <Button variant="contained" color="primary">
                    London
                </Button>
            </div>
            <div class="parisbutton">
                <Button variant="contained" color="primary">
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