import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

ProductList.propTypes = {
  data: PropTypes.object,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "id", label: "#", minWidth: 50, align: "right" },
  { id: "name", label: "Name", minWidth: 300 },
  { id: "stock", label: "Stock", minWidth: 100 },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

function ProductList({ data }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productList, setProductList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const productList1 = data.map((product) => {
      let totalQuantity = 0;
      if (product.productDetailList.length > 0) {
        totalQuantity = product.productDetailList.reduce(
          (total, number) => total + number.quantity,
          0
        );
      }

      return {
        id: product.id,
        name: product.name,
        stock: totalQuantity,
        price: product.originalPrice,
        category: product.categoryName,
      };
    });
    setProductList(productList1);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleActionProduct = (id) => {
    history.push(`/products/${id}`);
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
              {productList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "actions" ? (
                              <IconButton
                                size="medium"
                                onClick={() => handleActionProduct(row.id)}
                              >
                                <EditIcon fontSize="inherit" />
                              </IconButton>
                            ) : (
                              value
                            )}
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
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={productList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default ProductList;
