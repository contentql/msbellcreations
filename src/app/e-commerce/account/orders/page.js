import ProtectedRoute from 'src/routes/components/protected-route';
import EcommerceAccountOrdersView from 'src/sections/_ecommerce/view/ecommerce-account-orders-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Account: Orders',
};

export default function EcommerceAccountOrdersPage() {
  return <ProtectedRoute><EcommerceAccountOrdersView /></ProtectedRoute>;
}
