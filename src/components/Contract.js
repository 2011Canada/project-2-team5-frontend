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
  header: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  table: {
    width: '100%',
  },

  wanted: {
    marginTop: theme.spacing(8),
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
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <div className={classes.header}>
            <Typography component="h1" variant="h4">
              My Current Contract
            </Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.header}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              View new Wanted
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
          <Typography component="h1" variant="h2" align="center" color="error">
            Wanted
          </Typography>
          <TableContainer component={Paper}>
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
