import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';
import EcommercePostView from 'src/sections/_ecommerce/view/ecommerce-post-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'item',
};

export default function EcommerceProductPage({ params }) {
  return <MainLayout><EcommercePostView blogId={params.id} /></MainLayout>;
}

EcommerceProductPage.propTypes = {
  params: PropTypes.object,
};
