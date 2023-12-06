import MainLayout from 'src/layouts/main';
import ProtectedRoute from 'src/routes/components/protected-route';
import EcommerceAccountPersonalView from 'src/sections/_ecommerce/view/ecommerce-account-personal-view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Account: Personal',
};

export default function EcommerceAccountPersonalPage() {
  return <ProtectedRoute><MainLayout><EcommerceAccountPersonalView /></MainLayout></ProtectedRoute>;
}
