import ProtectedRoute from 'src/routes/components/protected-route';
import EcommerceCartView from 'src/sections/_ecommerce/view/ecommerce-cart-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Cart',
};

export default function EcommerceCartPage() {
  return <ProtectedRoute><EcommerceCartView /></ProtectedRoute>;
}
