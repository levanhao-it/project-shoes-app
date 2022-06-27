import React from "react";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@material-ui/core";

OrderDetailItem.propTypes = {};

function OrderDetailItem({ row }) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      <TableCell>{row.nameProduct}</TableCell>
      <TableCell>{row.size}</TableCell>
      <TableCell>{row.color}</TableCell>
      <TableCell>{row.salePrice}</TableCell>
      <TableCell>{row.quantity}</TableCell>
      <TableCell>{row.totalPrice}</TableCell>
    </TableRow>
  );
}

export default OrderDetailItem;
