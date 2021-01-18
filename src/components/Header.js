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
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    marginLeft: '10px',
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    marginRight: '10px',
    justifyContent: 'space-between',
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

const navLinks = [
  { title: `My Contract`, path: `/contract` },
  { title: `My Profile`, path: `/profile` },
];

const Header = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.authenticated);
  return user ? (
    <AppBar position="fixed" style={{ backgroundColor: '#222222' }}>
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <a href="/map" className={classes.linkText}>
              <Home fontSize="large" />
            </a>
          </IconButton>
        </Container>
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
          <a href={'/logout'} key={'logout'} className={classes.linkText}>
            <ListItem button>
              <ListItemText primary={'LOGOUT'} />
            </ListItem>
          </a>
        </List>
      </Toolbar>
    </AppBar>
  ) : (
    <></>
  );
};
export default Header;
