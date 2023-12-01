import ProtectedRoute from 'src/routes/components/protected-route';
import EcommerceCheckoutView from 'src/sections/_ecommerce/view/ecommerce-checkout-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Checkout',
};

export default function EcommerceCheckoutPage() {
  return <ProtectedRoute><EcommerceCheckoutView /></ProtectedRoute>;
}
