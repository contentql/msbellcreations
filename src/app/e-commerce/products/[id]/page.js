import PropTypes from 'prop-types';

import EcommerceProductView from 'src/sections/_ecommerce/view/ecommerce-product-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'item',
};

export default function EcommerceProductPage({ params }) {
  return <EcommerceProductView productId={params.id} />;
}

EcommerceProductPage.propTypes = {
  params: PropTypes.object,
};
