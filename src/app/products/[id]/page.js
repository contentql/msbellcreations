import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';
import EcommerceProductView from 'src/sections/_ecommerce/view/ecommerce-product-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'item',
};

export default function EcommerceProductPage({ params }) {
  return <MainLayout><EcommerceProductView productId={params.id} /></MainLayout>;
}

EcommerceProductPage.propTypes = {
  params: PropTypes.object,
};
