import MainLayout from 'src/layouts/main';
import EcommerceLegalTerms from 'src/sections/_ecommerce/legal/ecommerce-legal-terms';

export const metadata = {
  title: 'terms',
};

export default function EcommerceTermsPage() {
  return <MainLayout><EcommerceLegalTerms /></MainLayout>;
}
