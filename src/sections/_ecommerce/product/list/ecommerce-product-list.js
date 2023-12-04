import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { CATEGORIES } from 'src/_mock';

import EcommerceProductViewListItem from '../item/ecommerce-product-view-list-item';
import EcommerceProductViewGridItem from '../item/ecommerce-product-view-grid-item';
import EcommerceProductViewListItemSkeleton from '../item/ecommerce-product-view-list-item-skeleton';
import EcommerceProductViewGridItemSkeleton from '../item/ecommerce-product-view-grid-item-skeleton';

// ----------------------------------------------------------------------

export default function EcommerceProductList({ loading, viewMode, products, filter }) {
  const FilterByCategory = (product) => {
    if (filter.filterCategories.length === 0) return true;
    if (filter.filterCategories?.includes('all') && filter.filterCategories.length === 1)
      return true;
    return filter.filterCategories?.includes(product?.category.label);
  };

  const FilterByStartingPrice = (product) => {
    if (filter.filterPrice.start === 0) return true;

    return product.price >= filter.filterPrice.start;
  };

  const FilterByEndPrice = (product) => {
    if (filter.filterPrice.end === 0) return true;
    return product.price <= filter.filterPrice.end;
  };
  return (
    <>
      {viewMode === 'grid' ? (
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
        >
          {console.log("prds one",products)}
          {(loading ? [...Array(16)] : products)
            ?.filter(FilterByCategory)
            .filter(FilterByStartingPrice)
            .filter(FilterByEndPrice)
            .map((product, index) =>
              product ? (
                <EcommerceProductViewGridItem key={product.id} product={product} />
              ) : (
                <EcommerceProductViewGridItemSkeleton key={index} />
              )
            )}
        </Box>
      ) : (
        <Stack spacing={4}>
          {(loading
            ? [...Array(16)]
            : products
                .filter(FilterByCategory)
                .filter(FilterByStartingPrice)
                .filter(FilterByEndPrice)
          ).map((product, index) =>
            product ? (
              <EcommerceProductViewListItem key={product.id} product={product} />
            ) : (
              <EcommerceProductViewListItemSkeleton key={index} />
            )
          )}
        </Stack>
      )}
    </>
  );
}

EcommerceProductList.propTypes = {
  filter: PropTypes.object,
  loading: PropTypes.bool,
  products: PropTypes.array,
  viewMode: PropTypes.string,
};
