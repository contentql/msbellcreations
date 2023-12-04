import PropTypes from 'prop-types';

import EcommercePostView from 'src/sections/_ecommerce/view/ecommerce-post-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'item',
};

export default function EcommerceProductPage({ params }) {
  return <EcommercePostView blogId={params.id} />;
}

EcommerceProductPage.propTypes = {
  params: PropTypes.object,
};
