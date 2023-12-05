import EcommerceAccountOrdersView from 'src/sections/_ecommerce/view/ecommerce-account-orders-view';
import ProtectedRoute from 'src/routes/components/protected-route';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Account: Orders',
};

export default function EcommerceAccountOrdersPage() {
  return <ProtectedRoute><EcommerceAccountOrdersView /></ProtectedRoute>;
}
