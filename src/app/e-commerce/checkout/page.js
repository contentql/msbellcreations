import EcommerceCheckoutView from 'src/sections/_ecommerce/view/ecommerce-checkout-view';
import ProtectedRoute from 'src/routes/components/protected-route';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Checkout',
};

export default function EcommerceCheckoutPage() {
  return <ProtectedRoute><EcommerceCheckoutView /></ProtectedRoute>;
}
