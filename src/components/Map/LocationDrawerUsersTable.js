
import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, makeStyles, withStyles } from '@material-ui/core';

import {GetAllUsersInCity} from '../../utils/uri-fuctions.js';

const useStyles = makeStyles({
    table: {
      marginLeft: 'auto',
      marginRight: 'auto',
      minWidth: '500px',
    },
    backButton: {
      // color: 'white',
      // backgroundColor: '#252525',
      variant: 'outlined',
      flexFlow: 1,
      marginTop: '20px',
      marginBottom: '20px',
      marginLeft: '80%',
      marginRight: '10px',
    }
  });

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#202020',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#CCCCCC',
      },
      '&:nth-of-type(even)': {
        backgroundColor: '#DDDDDD',
      },
    },
  }))(TableRow);
  
//   function createData(name, knownAliases) {
//     return { name, knownAliases };
//   }


const LocationDrawerUsersTable = (props) => {
    const classes = useStyles();

    const [usersInCity, setUsersInCity] = React.useState([]);
    const [firstUserUpdate, setFirstUserUpdate] = React.useState(0);

    useEffect(() => {
      const populateUsersTable = async () => {
        if (firstUserUpdate === 0) {
          let users = await(GetAllUsersInCity(props.locationId));
          setUsersInCity(users);
          setFirstUserUpdate(firstUserUpdate + 1);
        }
      }
      populateUsersTable();
    }, [])

    return (
      <div>
        <Button className={classes.backButton} color="secondary" variant='outlined' onClick={props.swapper}>Back</Button>
        <TableContainer component={Paper} style={{maxWidth:'90%', marginLeft:'auto', marginRight:'auto'}}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow >
                <StyledTableCell>Name</StyledTableCell>
                {/* <StyledTableCell align="left">Known Aliases</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {usersInCity.map((users) => (
                <StyledTableRow key={users.userName}>
                  <StyledTableCell component="th" scope="row">
                    {users.userName}
                  </StyledTableCell>
                  {/* TODO: BUILD AN API CALL, AND HANDLE IT ON THE BACKEND, FOR GETTING ALL REVEALED ALIASES OF USERS IN A PARTICULAR LOCATION */}
                  {/* <StyledTableCell align="left">known aliases not implemented</StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}

export default LocationDrawerUsersTable;