import {
  Button,
  Fab,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import userApi from 'components/api/userApi';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

UserList.propTypes = {
  data: PropTypes.array,
};
UserList.defaultProps = {
  data: [],
};

const columns = [
  { id: 'full_name', label: 'NAME', minWidth: 170 },
  { id: 'email', label: 'EMAIL', minWidth: 100 },
  {
    id: 'create_by',
    label: 'CREATE BY',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'quantityOrders',
    label: 'QUANTITY ORDER',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'action',
    label: 'ACTION',
    minWidth: 170,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function UserList(data) {
  const classes = useStyles();
  const history = useHistory();

  const rows = [];
  data.data.map((e) => {
    rows.push({
      id: e.idUser,
      full_name: e.full_name,
      email: e.email,
      create_by: e.create_by,
      quantityOrders: e.quantityOrders,
      action: (
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={() => history.push(`/users/edit/${e.idUser}`)}
          >
            Edit
          </Button>
        </div>
      ),
    });
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default UserList;
