import MainLayout from 'src/layouts/main';
import EcommerceAboutView from 'src/sections/_ecommerce/view/ecommerce-about-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'About Us',
};

export default function EcommerceCartPage() {
  return <MainLayout><EcommerceAboutView /></MainLayout>;
}
