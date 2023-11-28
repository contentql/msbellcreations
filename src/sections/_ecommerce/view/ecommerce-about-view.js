'use client';

import { _members, _coursePosts, _brandsColor, _testimonials } from 'src/_mock';

import EcommerceAboutHero from '../about/ecommerce-about-hero';
import EcommerceAboutFaqs from '../about/ecommerce-about-faqs';
import EcommerceAboutCoreValues from '../about/ecommerce-about-core-values';

// ----------------------------------------------------------------------

export default function EcommerceAboutView() {
  return (
    <>
      <EcommerceAboutHero />
      <EcommerceAboutCoreValues />
      <EcommerceAboutFaqs />
    </>
  );
}
