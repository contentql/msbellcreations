'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { _products } from 'src/_mock';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { SplashScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ReviewEcommerce from '../../review/ecommerce/review-ecommerce';
import EcommerceProductDetailsInfo from '../product/details/ecommerce-product-details-info';
import EcommerceProductDetailsCarousel from '../product/details/ecommerce-product-details-carousel';
import EcommerceProductDetailsDescription from '../product/details/ecommerce-product-details-description';

// ----------------------------------------------------------------------

export default function EcommerceProductView({ productId }) {
  const loading = useBoolean(true);
   const formOpen = useBoolean();
  const { data, isLoading } = useQuery(['productsinView', productId], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/products?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );

  const _mockProduct = data?.data
    ?.filter((product) => product.id.toString() === productId.toString())
    .at(0);

    

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          sx={{ my: 3 }}
          links={[
            { name: 'Home', href: '/' },
            { name: 'Products', href: paths.eCommerce.products },
            { name: _mockProduct?.name },
          ]}
        />
      </Container>
      <Container sx={{ overflow: 'hidden', mt: 4 }}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsCarousel images={_mockProduct?.images} />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <EcommerceProductDetailsInfo
              onOpenForm={formOpen.onTrue}
              productId={_mockProduct?.id}
              name={_mockProduct?.name}
              price={_mockProduct?.price}
              caption={_mockProduct?.caption}
              priceSale={_mockProduct?.priceSale}
              ratingNumber={_mockProduct?.ratingNumber}
              totalReviews={_mockProduct?.review?.length}
              avgRating={_mockProduct?.review?.reduce((sum,ele)=>sum+=ele.rating,0)/_mockProduct?.review?.length}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsDescription
              description={_mockProduct?.description}
              ingredients={_mockProduct?.ingredients}
              howtouse={_mockProduct?.howtouse}
              // specifications={[
              //   { label: 'Category', value: 'Mobile' },
              //   { label: 'Manufacturer', value: 'Apple' },
              //   { label: 'Warranty', value: '12 Months' },
              //   { label: 'Serial number', value: '358607726380311' },
              //   { label: 'Ships From', value: 'United States' },
              // ]}
            />
          </Grid>
        </Grid>
      </Container>

       <ReviewEcommerce formOpen={formOpen} productId={productId} review={_mockProduct?.review}/> 
    </>
  );
}

EcommerceProductView.propTypes = {
  productId: PropTypes.string,
};
