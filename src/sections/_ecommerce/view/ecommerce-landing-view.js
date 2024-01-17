'use client';

import { useQuery } from 'react-query';

import Box from '@mui/material/Box';

import { _testimonials } from 'src/_mock';
import { _hotdeals } from 'src/_mock/_hotdeals';

import EcommerceLandingHero from '../landing/ecommerce-landing-hero';
import EcommerceTestimonial from '../testimonial/ecommerce-testimonial';
import EcommerceLandingCategories from '../landing/ecommerce-landing-categories';
import EcommerceLandingTopProducts from '../landing/ecommerce-landing-top-products';
import EcommerceLandingSpecialOffer from '../landing/ecommerce-landing-special-offer';
import EcommerceLandingHotDealToday from '../landing/ecommerce-landing-hot-deal-today';
import EcommerceLandingFeaturedBrands from '../landing/ecommerce-landing-featured-brands';
import EcommerceLandingPopularProducts from '../landing/ecommerce-landing-popular-products';
import EcommerceLandingFeaturedProducts from '../landing/ecommerce-landing-featured-products';

// ----------------------------------------------------------------------

export default function EcommerceLandingView() {
  const { data } = useQuery(['productsData'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/products?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );

  const { data: configuration } = useQuery(['configuration'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/configuration?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );

  const { data: reviews } = useQuery(['review'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/reviews?sort=rank:asc&populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );


  const PopularProducts = data?.data?.sort((a, b) => b.sold - a.sold).slice(0, 8);

  const Herodata = data?.data.filter((item) => item.home);
  const Hotdeals = data?.data.filter((item) => item.hot_deals);
  const Featuredproducts = data?.data.filter((item) => item.featured_products);
  const specialOffer = data?.data.filter((item) => item.special_offer).at(0);

  return (
    <Box sx={{ mt: '30px' }}>
      {configuration?.data.Hero ? <EcommerceLandingHero Hero={Herodata} /> : null}

      <EcommerceLandingCategories />

      {configuration?.data.hot_deals ? <EcommerceLandingHotDealToday Hotdeals={Hotdeals} /> : null}

      {configuration?.data.featured_products ? (
        <EcommerceLandingFeaturedProducts Featuredproducts={Featuredproducts} />
      ) : null}

      {configuration?.data.special_offer ? (
        <EcommerceLandingSpecialOffer specialOffer={specialOffer} />
      ) : null}

      {/* <EcommerceLandingFeaturedBrands /> */}

      {configuration?.data.popular_products ? (
        <EcommerceLandingPopularProducts PopularProducts={PopularProducts} />
      ) : null}

      {/* <EcommerceLandingTopProducts /> */}

      {configuration?.data.testimonials ? (
        <EcommerceTestimonial testimonials={reviews?.data} />
      ) : null}
    </Box>
  );
}
