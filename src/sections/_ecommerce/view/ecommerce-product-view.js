'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _products } from 'src/_mock';
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
  // console.log('id ', productId);
  const { data } = useQuery(['products'], () =>
    fetch(process.env.NEXT_PUBLIC_PODUCTS_API, {
      method: 'GET',
    }).then((res) => res.json())
  );

  console.log("ck",data?.data)
  const _mockProduct = data?.data.filter((product) => product.id.toString() === productId.toString()).at(0);
  console.log("mock product",_mockProduct)
  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <>
      <Container sx={{ overflow: 'hidden',mt:4 }}>
        

        <Grid container spacing={{ xs: 5, md: 8}}>
          <Grid xs={12} md={6} lg={7}>
          <EcommerceProductDetailsCarousel images={_mockProduct.images} /> 
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <EcommerceProductDetailsInfo
              productId={_mockProduct.id}
              name={_mockProduct.name}
              price={_mockProduct.price}
              caption={_mockProduct.caption}
              priceSale={_mockProduct.priceSale}
              ratingNumber={_mockProduct.ratingNumber}
              totalReviews={_mockProduct.totalReviews}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsDescription
              description={_mockProduct.description}
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

      {/* <ReviewEcommerce /> */}
    </>
  );
}

EcommerceProductView.propTypes = {
  productId: PropTypes.string,
};
