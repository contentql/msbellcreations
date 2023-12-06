import MainLayout from 'src/layouts/main';
import EcommerceLegalReturnPolicy from 'src/sections/_ecommerce/legal/ecommerce-legal-return-policy';

export const metadata = {
  title: 'Apple iPhone',
};

export default function EcommerceProductPage() {
  return <MainLayout><EcommerceLegalReturnPolicy /></MainLayout>;
}
