'use client';

import MarketingAbout from 'src/sections/_marketing/about/marketing-about';
import { _members, _coursePosts, _brandsColor, _testimonials } from 'src/_mock';
import MarketingServices from 'src/sections/_marketing/services/marketing-services';

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
      <MarketingServices />
      <MarketingAbout />
    </>
  );
}
