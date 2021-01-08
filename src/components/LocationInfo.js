import React from 'react';
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

import paris_test_photo from '../paris_test_photo.jpg';

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
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({left: false});

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const locationInformation = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <p style={{marginLeft:'10%', marginTop:'5%', marginBottom:'5%'}}>This is information about Paris. I hope it wraps correctly. If it doesn't wrap correctly I will be sad, and then I will have to go out and buy a bunch of croissants and get fat. So, hopefully it doesn't come to that.</p>
        <Divider />
        <h3 style={{marginLeft:'20px'}}>Actions</h3>
        <List>
            {['Hack', 'View Users in the City', 'Go to London', 'Go to Berlin'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>
                    {index === 0 ? <CameraIcon /> : (index === 1 ? <PeopleIcon /> : <FlightTakeoffIcon />)}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
    </div>
  );

  return (
    <div>
        <React.Fragment>
          <Button onClick={toggleDrawer('left', true)}>Paris</Button>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
              <h1 style={{marginLeft:'auto', marginRight:'auto'}}>Paris</h1>
              <img src={paris_test_photo} alt="Paris" style={{borderRadius: '5%', maxWidth: '50%', maxHeight: '50%', marginLeft: 'auto', marginRight:'auto'}} />
            {locationInformation('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}