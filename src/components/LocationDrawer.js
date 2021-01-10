import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {GetAllUsersInCity, GetNextLocation, HandleHackRequest} from '../utils/uri-fuctions.js';

const useStyles = makeStyles({
  list: {
    width: '33vw',
    minWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  fullList: {
    width: 'auto',
  },
  table: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
  },
  backButton: {
    backgroundColor: 'white',
    flexFlow: 1,
    marginTop: '20px',
    marginBottom: '10px',
    marginLeft: '80%',
    marginRight: '10px',
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, knownAliases) {
  return { name, knownAliases };
}

const LocationDrawer = (props) => {
  const classes = useStyles();

  const user = useSelector((state) => state.authenticated);             //this is the user information (redux)

  const [state, setState] = React.useState({left: false});              //this is the drawer state
  const [currentView, setCurrentView] = React.useState('main');         //this is the page state within the drawer

  const [openDialog, setDialogOpen] = React.useState(false);            //this is the dialog state
  const [currentDialog, setCurrentDialog] = React.useState('');         //this is the dialog parameter (that specifies which button is pressed)

  const [usersInCity, setUsersInCity] = React.useState({});             //this gets and updates all the users in the city
  const [hacked, setHacked] = React.useState(false);                    //this notifies if the user hacked the city
  const [aHackToStopHack, setAHackToStopHack] = React.useState(false);  //this stops the update function from continually calling the hack function
  
  const [notifier, incrementNotifier] = React.useState(0);              //if I need to ping useEffect ever


  const updateUsersInCity = async () => {
    if (!usersInCity) {
      let usersToBeInTheCity = await(GetAllUsersInCity(props.location.id));
      setUsersInCity(usersToBeInTheCity);
    }
  }


  const swapCurrentView = () => {
    if (currentView === 'main') {
      setCurrentView('userView');
    }
    else {
      setCurrentView('main');
    }
  }


  // returns the new location information from the server when a user makes a valid change to their location
  const changeLocation = async (nextId) => {
    if (nextId === props.location.adjacent[0].id || 
        nextId === props.location.adjacent[1].id) {
          let nextLocation = await(GetNextLocation(nextId));
          props.setLocation(nextLocation);
        }

    // TODO: I also need to update the users current location, but I don't know how to do that with Heng's redux (ASK HIM TO DO IT)
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

  }, [props.location, currentView, hacked, aHackToStopHack]);



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
        changeLocation(props.location.adjacent[0].id);
        break;
      case 'move2':
        changeLocation(props.location.adjacent[1].id);
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


  //TODO
  //display table
  const showUsersInCity = () => {
    updateUsersInCity();
    return (
      <div>
        <Button className={classes.backButton} variant='outlined' onClick={swapCurrentView}>Back</Button>
        <UsersInCityTable />
      </div>
    )
  }


  //displays the actions (list of buttons) part of the drawer
  const locationActions = () => {
    return (
    <div className={clsx(classes.list)} role="presentation">
      <h3 style={{marginLeft:'20px'}}>Actions</h3>
      {props.location.id !== user.currentLocation ? 
      (
        <List>
            <ListItem button key='Hack' disabled={hacked} onClick={handleHackDialogOpen}>
                <ListItemIcon> <CameraIcon /></ListItemIcon>
                <ListItemText primary='Hack' />
            </ListItem>
            <ListItem button onClick={swapCurrentView} key='View Users in City'>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary='View Users in City' />
            </ListItem>
            <ListItem button onClick={handleMove1DialogOpen} key={'Travel to ' + props.location.adjacent[0].name}>
                <ListItemIcon><FlightTakeoffIcon /></ListItemIcon>
                <ListItemText primary={'Travel to ' + props.location.adjacent[0].name} />
            </ListItem>
            <ListItem button onClick={handleMove2DialogOpen} key={'Travel to ' + props.location.adjacent[1].name}>
                <ListItemIcon><FlightTakeoffIcon /></ListItemIcon>
                <ListItemText primary={'Travel to ' + props.location.adjacent[1].name} />
            </ListItem>
        </List>
      ) : (
        <div>
          <p>You are not in this location.</p>
          <p>You can only act in your current city.</p>
        </div>
      )}
    </div>
  )};


  // displays the dialog
  const DialogPopup = () => {
    let title = '';
    let description = '';
    if (currentDialog === 'hack') {
      title = `Are you sure you want to hack ${props.location.locationName}?`
      description = `This will reveal all active aliases in this location.
      If you do not reveal your target with this hack, your contract will fail, and your company reputation will go down.`
    }
    else if (currentDialog === 'move1') {
      title = `Are you sure you want to travel to ${props.location.adjacent[0].name}?`
      description = `Your movement will be put on cooldown.`
    }
    else if (currentDialog === 'move2') {
      title = `Are you sure you want to travel to ${props.location.adjacent[1].name}?`
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


  const UsersInCityTable = () => {
    let rows = [];

    //TEST ROW
    rows.push(createData('Jane Doe', ['Mrs. Smith', 'Ruby Tuesdays', 'Death Adder'].toString()))
    
    for (user in usersInCity) {
      rows.push(createData(user.name, user.knownAliases));
    }

    return (
        <TableContainer component={Paper} style={{maxWidth:'90%', marginLeft:'auto', marginRight:'auto'}}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="left">Known Aliases</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.knownAliases}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
  }

  
  return (
    <div>
        <React.Fragment>
          <Button onClick={toggleDrawer('left', true)}>{props.location.locationName}</Button>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            <h1 style={{marginLeft:'auto', marginRight:'auto'}}>{props.location.locationName}</h1>
            <img src={props.location.image} alt={props.location.locationName} style={{borderRadius: '5%', maxWidth: '50%', maxHeight: '50%', marginLeft: 'auto', marginRight:'auto'}} />
            <p style={{marginLeft:'10%', marginTop:'5%', marginBottom:'5%'}}>{props.location.description}</p>
            <Divider style={{marginLeft: '5%', marginRight: '5%'}} />
            {currentView === 'main' ? locationActions() : showUsersInCity()}
          </Drawer>
          <DialogPopup />
        </React.Fragment>
    </div>
  );
}

export default LocationDrawer;