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
    fetch(process.env.NEXT_PUBLIC_URL+"api/products?populate=*", {
      method: 'GET',
    }).then((res) => res.json())
  );

  const PopularProducts=data?.data.sort((a,b)=>b.sold-a.sold).slice(0,8);
 console.log("popular porducts:",PopularProducts)
  const Herodata=data?.data.filter((item)=>item.home)
  const Hotdeals=data?.data.filter((item)=>item.hot_deals)
  const Featuredproducts=data?.data.filter((item)=>item.featured_products)
  const specialOffer=data?.data.filter((item)=>item.special_offer).at(0);

  console.log("filtered data",Herodata,Hotdeals,Featuredproducts,specialOffer)
  return (
    <>
      <EcommerceLandingHero Hero={Herodata}/>

      <EcommerceLandingCategories />

      {_hotdeals.products.HotDeals && <EcommerceLandingHotDealToday Hotdeals={Hotdeals} />}

      <EcommerceLandingFeaturedProducts Featuredproducts={Featuredproducts}/>

      {/* <EcommerceLandingSpecialOffer  specialOffer={specialOffer}/> */}

      {/* <EcommerceLandingFeaturedBrands /> */}

      <EcommerceLandingPopularProducts PopularProducts={PopularProducts} />

      {/* <EcommerceLandingTopProducts /> */}

      <EcommerceTestimonial testimonials={_testimonials} />
    </>
  );
}
