import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { auth } from '../actions';
import { Redirect } from 'react-router';
import { Alert, AlertTitle } from '@material-ui/lab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { MakeAnAlias, GetCurrentAlias, GetAllUserAliases, UpdateAlias } from '../utils/uri-fuctions.js';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import EditProfile from './EditProfile';

function Copyright() {
    return (
        <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: '#242422',
        width: '100vw',
        height: '100',
        color: 'white',
    },
    paper: {
        paddingTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        color: 'white',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cssLabel: {
        color: 'white',
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `white`,
        },
    },

    multilineColor: {
        color: 'white',
    },
    cssFocused: {},

    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important',
    },
}));

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


export default function Profile() {

    const classes = useStyles();

    const user = useSelector((state) => state.authenticated);

    const [userAliases, setUserAliases] = useState([]);

    const [newAliasName, setNewAliasName] = useState("");

    const [needLoadAlias, setNeedLoadAlias] = useState(true);

    const [currentAliasName, setCurrentAliasName] = useState("");
     
    const updateUserAliases = async () => {
          let allUserAliases = await (GetAllUserAliases(user.userId));
          if(needLoadAlias){
            setUserAliases(allUserAliases);
          }
         
    }

    const getCurrentAlias = async () => {
        let currentAlias = await (GetCurrentAlias(user.userId));
        if(needLoadAlias){
            setCurrentAliasName(currentAlias);
            setNeedLoadAlias(false);
        }
    }

    const getUserAliases = () => {
        updateUserAliases();
        return (
          <div>
            <UserAliasesTable />
          </div>
        )
    }

    useEffect(() => {
        
        getCurrentAlias();

    });

    const handleSetAlias =(alias)=>{
        UpdateAlias(user.userId, alias)
        setCurrentAliasName(alias.name)
    }
    
    function changeHandler(event) {
        const newName = event.target.value;
        setNewAliasName(newName);
    };
    
    function handleSubmit(event) {

        event.preventDefault();

        MakeAnAlias(user.userId, newAliasName);

        setCurrentAliasName(newAliasName);
        
        const newAlias = {
            aliasLevel: 0,      
            name: newAliasName,
            stateID: "hidden"      
        };
        const updatedAliases = userAliases;
        updatedAliases.push(newAlias)
        setUserAliases(updatedAliases);

    };

    const UserAliasesTable = () => {
    
        return (
          <TableContainer component={Paper} style={{ width: '90vw', marginLeft: 'auto', marginRight: 'auto' }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                 
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Level</StyledTableCell>
                  <StyledTableCell align="center">State</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userAliases.map((alias) => (
                  <StyledTableRow key={alias.aliasID}>
                    <StyledTableCell align="center">{alias.name}</StyledTableCell>
                    <StyledTableCell align="center">{alias.aliasLevel}</StyledTableCell>
                    <StyledTableCell align="center">{alias.stateID}</StyledTableCell>
                    <StyledTableCell align="center">
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={()=>handleSetAlias(alias)}
                        >
                        Take Alias
                        </Button></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
    }

    return  (
        <div className={classes.root}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <br />
                    <br />
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>User ID:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>{user.userId}</p>
                    </div>
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>Email:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>{user.email}</p>
                    </div>
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>Username:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>{user.userName}</p>
                    </div>
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>Current Location:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>{user.currentLocation.locationName}</p>
                    </div>
                    <br/>
                    <BrowserRouter>
                        <Route path="/profile/edit" exact component={EditProfile} />
                        <Link to="/profile/edit">Edit Profile</Link>
                    </BrowserRouter>
                    <br/>
                    <div>
                        <h3 style={{textAlign:"center"}}>Your Aliases</h3>
                         {getUserAliases()} 
                    </div>
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>Current Alias:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>{currentAliasName}</p>
                    </div>
                   
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <h3>Create New Alias</h3>
                        <TextField
                            placeholder="Alias Name"
                            onChange={(e) => changeHandler(e)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="newAlias"
                            label="Alias Name"
                            name="newAlias"
                            autoFocus
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                    input: classes.multilineColor,
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Create</Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}