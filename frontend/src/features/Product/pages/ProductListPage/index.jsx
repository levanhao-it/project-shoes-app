import { Box, Container, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

import { Pagination } from "@material-ui/lab";
import productApi from "api/productApi";
import OfferBanner from "components/OfferBanner";
import FilterAndSort from "features/Product/components/FilterAndSort";
import ProductList from "features/Product/components/ProductList";
import ProductSkeletonList from "features/Product/components/ProductSkeletonList";
import "./styles.scss";

ProductListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "80px",
  },

  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",

    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
  },
  filter: {
    float: "right",
    marginBottom: "20px",
  },
}));

function ProductListPage(props) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    size: 3,
    page: 1,
    sort: "createdDate,desc",
  });
  const [pagination, setPagination] = useState({
    total: 10,
    page: 1,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll(filters);
        setProducts(data.products);
        console.log(data.products);
        setPagination({
          total: data.totalPages,
          page: data.currentPage,
        });
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg" fixed>
        <OfferBanner />
        <Box className={classes.filter}>
          <FilterAndSort filters={filters} onChange={handleFiltersChange} />
        </Box>
        {loading ? <ProductSkeletonList /> : <ProductList data={products} />}
        <Box className={classes.pagination}>
          <Pagination
            count={pagination.total}
            page={pagination.page}
            className="pagination"
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default ProductListPage;
