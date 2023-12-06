import MainLayout from 'src/layouts/main';
import EcommerceContactView from 'src/sections/_ecommerce/view/ecommerce-contact-view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Contact',
};

export default function EcommerceContactPage() {
  return <MainLayout><EcommerceContactView /></MainLayout>;
}
