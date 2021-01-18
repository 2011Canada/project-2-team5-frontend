import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { baseClient } from '../utils/remote';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#303030',
  },
  header: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(4),
    paddingLeft: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
  },
  table: {
    width: '100%',
  },

  wanted: {
    marginTop: theme.spacing(12),
    backgroundColor: '#CCCCCC',
    width: '50%',
    height: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '10px',
    borderWidth: '5px',
    borderColor: '#121212',
    borderStyle: 'solid'
  },
}));

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
      backgroundColor: '#DDDDDD',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#EEEEEE',
    },
  },
}))(TableRow);

const WantedList = () => {
  const user = useSelector((state) => state.authenticated);

  const [wanted, setWanted] = useState([]);
  const [myContract, setMyContract] = useState([]);

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const getList = async () => {
      const res = await baseClient.get('/contracts');
      const wantedList = res.data.filter(
        (d) => d.statusId === 1 && d.targetId !== user.userId
      );
      const currentList = res.data.filter(
        (d) => d.contractedTo === user.userId
      );
      setWanted(wantedList);
      setMyContract(currentList);
    };
    getList();
  }, [user.userId, wanted.length]);

  const classes = useStyles();

  const handleOnclick = async (row) => {
    const contract = {
      contractId: row.contractId,
      description: row.description,
      contractedTo: user.userId,
      statusId: 2,
      targetId: row.targetId,
    };
    //here call api to change
    await baseClient.put(`/contracts/${contract.contractId}`, contract);

    const newWanted = wanted.filter(
      (w) => w.contractId !== contract.contractId
    );
    setWanted(newWanted);
    handleClose();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <div className={classes.header}>
            <Typography component="h1" variant="h4">
              Active Contracts
            </Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.header}>
            <Button variant="outlined" color="secondary" onClick={handleOpen}>
              Check Contract Board
            </Button>
          </div>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.wanted}>
          <Typography component="h1" variant="h2" align="center" style={{paddingBottom: '30px', paddingTop: '30px', width: '100%', backgroundColor: 'darkred', color: 'white', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}>
            Wanted
          </Typography>
          <TableContainer component={Paper} style={{marginLeft:'auto', marginRight:'auto'}}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Contract ID</StyledTableCell>
                  <StyledTableCell>Target</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wanted.map((row) => (
                  <StyledTableRow key={row.contractId}>
                    <StyledTableCell component="th" scope="row">
                      #{row.contractId}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.player.firstName} {row.player.lastName}
                    </StyledTableCell>
                    <StyledTableCell>{row.description}</StyledTableCell>
                    <StyledTableCell>{row.current.statusName}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOnclick(row)}
                      >
                        GET
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
      {myContract.length > 0 && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Contract ID</StyledTableCell>
                <StyledTableCell>Target</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myContract.map((row) => (
                <StyledTableRow key={row.contractId}>
                  <StyledTableCell component="th" scope="row">
                    #{row.contractId}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.player.firstName} {row.player.lastName}
                  </StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>{row.current.statusName}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default WantedList;
