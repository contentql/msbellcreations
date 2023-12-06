'use client';

import { useQuery } from 'react-query';

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
  const { data } = useQuery(['products'], () =>
    fetch(process.env.NEXT_PUBLIC_PODUCTS_API, {
      method: 'GET',
    }).then((res) => res.json())
  );

  const { data: configuration } = useQuery(['configuration'], () =>
    fetch(process.env.NEXT_PUBLIC_CONFIGURATION_API, {
      method: 'GET',
    }).then((res) => res.json())
  );
  console.log('configuration', configuration);
  const PopularProducts = data?.data.sort((a, b) => b.sold - a.sold).slice(0, 8);
  console.log('popular porducts:', PopularProducts);
  const Herodata = data?.data.filter((item) => item.home);
  const Hotdeals = data?.data.filter((item) => item.hot_deals);
  const Featuredproducts = data?.data.filter((item) => item.featured_products);
  const specialOffer = data?.data.filter((item) => item.special_offer).at(0);

  console.log('filtered data', Herodata, Hotdeals, Featuredproducts, specialOffer);
  return (
    <>
      {configuration?.data.Hero?<EcommerceLandingHero Hero={Herodata} />:null}  

      <EcommerceLandingCategories />

      {configuration?.data.hot_deals?<EcommerceLandingHotDealToday Hotdeals={Hotdeals} />:null}

      {configuration?.data.featured_products?<EcommerceLandingFeaturedProducts Featuredproducts={Featuredproducts} />:null}

      {/* <EcommerceLandingSpecialOffer  specialOffer={specialOffer}/> */}

      {/* <EcommerceLandingFeaturedBrands /> */}

      {configuration?.data.popular_products? <EcommerceLandingPopularProducts PopularProducts={PopularProducts} />:null}

      {/* <EcommerceLandingTopProducts /> */}

      <EcommerceTestimonial testimonials={_testimonials} />
    </>
  );
}
