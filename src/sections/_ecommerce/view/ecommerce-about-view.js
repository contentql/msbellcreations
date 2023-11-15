'use client';

import { _members, _coursePosts, _brandsColor, _testimonials } from 'src/_mock';

import EcommerceAboutHero from '../about/ecommerce-about-hero';
import EcommerceAboutCoreValues from '../about/ecommerce-about-core-values';

// ----------------------------------------------------------------------

export default function EcommerceAboutView() {
  return (
    <>
      <EcommerceAboutHero />
      <EcommerceAboutCoreValues />
    </>
  );
}
