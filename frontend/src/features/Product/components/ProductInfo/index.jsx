import PropTypes from 'prop-types';
import ProductSilder from '../ProductSlider';
import ProductTabs from '../ProductTabs';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo({ product = {} }) {
  return (
    <div>
      <ProductSilder product={product} />
      <ProductTabs product={product} />
    </div>
  );
}

export default ProductInfo;
