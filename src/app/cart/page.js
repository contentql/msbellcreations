// import ProtectedRoute from 'src/routes/components/protected-route';
import MainLayout from 'src/layouts/main';
import EcommerceCartView from 'src/sections/_ecommerce/view/ecommerce-cart-view';
// import ProtectedRoute from 'src/routes/components/protected-route';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Cart',
};

export default function EcommerceCartPage() {
  return <MainLayout><EcommerceCartView /></MainLayout>
  ;
}
