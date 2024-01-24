'use client';

import { _members, _coursePosts, _brandsColor, _testimonials } from 'src/_mock';
import { useQuery } from 'react-query';
import EcommerceAboutHero from '../about/ecommerce-about-hero';
import EcommerceAboutFaqs from '../about/ecommerce-about-faqs';
import EcommerceAboutCoreValues from '../about/ecommerce-about-core-values';

// ----------------------------------------------------------------------

export default function EcommerceAboutView() {
  const { data: about } = useQuery(['about'], () =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/aboutus?populate=*`, {
      method: 'GET',
    }).then((res) => res.json())
  );
  console.log('about', about?.data);
  return (
    <>
      <EcommerceAboutHero about={about?.data} />
      <EcommerceAboutCoreValues />
      <EcommerceAboutFaqs faqs={about?.data?.faqs} />
    </>
  );
}
