import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import CameraIcon from '@material-ui/icons/Camera';
import PeopleIcon from '@material-ui/icons/People';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LocationDrawerUsersTable from './LocationDrawerUsersTable';
import {GetNextLocation, HandleHackRequest} from '../../utils/uri-fuctions.js';
import {userAction} from '../../actions/index.js';

const drawerMaxWidth = '600px'
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  drawer: {
    maxWidth: drawerMaxWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    maxWidth: drawerMaxWidth,
  },
});

const LocationDrawer = (props) => {
  const classes = useStyles();

  const user = useSelector((state) => state.authenticated);             //this is the user information (redux)
  const dispatch = useDispatch();

  const [state, setState] = React.useState({left: false});              //this is the drawer state
  const [currentView, setCurrentView] = React.useState('main');         //this is the page state within the drawer

  const [openDialog, setDialogOpen] = React.useState(false);            //this is the dialog state
  const [currentDialog, setCurrentDialog] = React.useState('');         //this is the dialog parameter (that specifies which button is pressed)

  const [hacked, setHacked] = React.useState(false);                    //this notifies if the user hacked the city
  const [aHackToStopHack, setAHackToStopHack] = React.useState(false);  //this stops the update function from continually calling the hack function

  const [grabbedLocation, setGrabbedLocation] = React.useState(false);
  const [location, setLocation] = React.useState({});
  const [adjacentLocation1, setAdjacentLocation1] = React.useState({});
  const [adjacentLocation2, setAdjacentLocation2] = React.useState({});
  const [locationChangeNotifier, notifyLocationChange] = React.useState(0);

  const swapCurrentView = () => {
    if (currentView === 'main') {
      setCurrentView('userView');
    }
    else {
      setCurrentView('main');
    }
  }


  // TODO: I need to update the users current location and close the drawer. 
  // But, I don't know how to do that with Heng's redux storage (ASK FOR HELP)
  const changeLocation = async (locationId) => {
    console.log("take action!!!");
    user.currentLocationId = locationId;
    //dispatch(userAction.updateLocation(user));
    dispatch(userAction.updateLocation(user));
    notifyLocationChange(locationChangeNotifier + 1);
    console.log(user)
  }


  const changeHackStatus = () => {
    if (!hacked) {
      setHacked(true);
    }
  };


  //updates the DOM
  useEffect(() => {
    console.log("in useEffect hook");
    if (hacked && aHackToStopHack === false) {
      //TODO: 
      //  - right now this shows nothing, just calls the request
      //  - contract success or failure should show
      //  - need to have the contracts tied to the user first 
      const updateWithHack = async () => {
        await(HandleHackRequest());
      }
      updateWithHack();
      setAHackToStopHack(true);
    }

    //Gets the location data from the server
    if (!grabbedLocation) {
      const grabLocationData = async () => {
        let currentLocationData = await(GetNextLocation(props.locationId));
        setLocation(currentLocationData);

        let adjacentLocationData1 = await(GetNextLocation(currentLocationData.adjacentLocation1));
        let adjacentLocationData2 = await(GetNextLocation(currentLocationData.adjacentLocation2));
        setAdjacentLocation1(adjacentLocationData1);
        setAdjacentLocation2(adjacentLocationData2);

        setGrabbedLocation(true);
      }

      grabLocationData();
    }

  }, [currentView, hacked, aHackToStopHack, grabbedLocation, locationChangeNotifier]);



  //various dialog openers
  const handleHackDialogOpen = () => {
    setDialogOpen(true);
    setCurrentDialog('hack');
  };
  const handleMove1DialogOpen = () => {
    setDialogOpen(true);
    setCurrentDialog('move1');
  };
  const handleMove2DialogOpen = () => {
    setDialogOpen(true);
    setCurrentDialog('move2');
  };


  //closes the dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentDialog('');
  };


  //handles the confirmed actions from the dialogs
  const handleDialogYes = () => {
    switch (currentDialog) {
      case 'hack':
        changeHackStatus(true);
        break;
      case 'move1':
        changeLocation(adjacentLocation1.locationId);
        break;
      case 'move2':
        changeLocation(adjacentLocation2.locationId);
        break;
      default:
        break;
    }

    handleDialogClose();
    setCurrentDialog('');
  };


  //opens and closes the drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };


  //displays the actions (list of buttons) part of the drawer
  const LocationActions = () => {
    return (
    <div className={clsx(classes.list)} role="presentation">
      <h3 style={{marginLeft:'40px'}}>Actions</h3>
      {props.locationId === user.currentLocationId ? 
      (
        <List style={{marginLeft:'40px'}}>
            <ListItem button key='Hack' disabled={hacked} onClick={handleHackDialogOpen}>
                <ListItemIcon> <CameraIcon /></ListItemIcon>
                <ListItemText primary='Hack' />
            </ListItem>
            <ListItem button onClick={swapCurrentView} key='View Users in City'>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary='View Users in City' />
            </ListItem>
            <ListItem button onClick={handleMove1DialogOpen} key={'Travel to ' + adjacentLocation1.locationName}>
                <ListItemIcon><FlightTakeoffIcon /></ListItemIcon>
                <ListItemText primary={'Travel to ' + adjacentLocation1.locationName} />
            </ListItem>
            <ListItem button onClick={handleMove2DialogOpen} key={'Travel to ' + adjacentLocation2.locationName}>
                <ListItemIcon><FlightTakeoffIcon /></ListItemIcon>
                <ListItemText primary={'Travel to ' + adjacentLocation2.locationName} />
            </ListItem>
        </List>
      ) : (
        <div style={{marginLeft:'40px'}}>
          <p>You cannot take any actions here, because you are not in this location.</p>
        </div>
      )}
    </div>
  )};


  // NOTE: Maybe think about putting this in its own class
  // displays the dialog
  const DialogPopup = () => {
    let title = '';
    let description = '';
    if (currentDialog === 'hack') {
      title = `Are you sure you want to hack ${location.locationName}?`
      description = `This will reveal all active aliases in this location.
      If you do not reveal your target with this hack, your contract will fail, and your company reputation will go down.`
    }
    else if (currentDialog === 'move1') {
      title = `Are you sure you want to travel to ${adjacentLocation1.locationName}?`
      description = `Your movement will be put on cooldown.`
    }
    else if (currentDialog === 'move2') {
      title = `Are you sure you want to travel to ${adjacentLocation2.locationName}?`
      description = `Your movement will be put on cooldown.`
    }


    return (
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDialogYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  
  return (
    <div>
        <React.Fragment>
          <Button className={classes.drawer} onClick={toggleDrawer('left', true)}>{location.locationName}</Button>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)} 
                classes={{
                paper: classes.drawerPaper,}}>
            <h1 style={{marginLeft:'auto', marginRight:'auto'}}>{location.locationName}</h1>
            <img src={location.image} alt={location.locationName} style={{borderRadius: '5%', maxWidth: '50%', maxHeight: '50%', marginLeft: 'auto', marginRight:'auto'}} />
            <p style={{marginLeft:'10%', marginRight: '10%', marginTop:'5%', marginBottom:'5%'}}>{location.description}</p>
            <Divider style={{marginLeft: '5%', marginRight: '5%'}} />
            {currentView === 'main' ? <LocationActions /> : <LocationDrawerUsersTable locationId={location.locationId} swapper={swapCurrentView}/>}
            <DialogPopup />
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default LocationDrawer;