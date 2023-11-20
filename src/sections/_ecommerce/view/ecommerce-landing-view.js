'use client';

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
  return (
    <>
      <EcommerceLandingHero />

      <EcommerceLandingCategories />

      {_hotdeals.products.HotDeals && <EcommerceLandingHotDealToday />}

      <EcommerceLandingFeaturedProducts />

      <EcommerceLandingSpecialOffer />

      <EcommerceLandingFeaturedBrands />

      <EcommerceLandingPopularProducts />

      {/* <EcommerceLandingTopProducts /> */}

      <EcommerceTestimonial testimonials={_testimonials} />
    </>
  );
}
