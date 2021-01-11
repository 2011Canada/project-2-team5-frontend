import * as React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { auth } from '../actions';
const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

const navLinks = [{ title: `My Profile`, path: `/myprofile` }];

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <a href="/dashboard" className={classes.linkText}>
              <Home fontSize="large" />
            </a>
          </IconButton>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <a href={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
            <a href={'/'} key={'logout'} className={classes.linkText}>
              <ListItem button onClick={dispatch(auth.logout())}>
                <ListItemText primary={'LOGOUT'} />
              </ListItem>
            </a>
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
