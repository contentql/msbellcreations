import MainLayout from 'src/layouts/main';
import EcommerceAccountPaymentView from 'src/sections/_ecommerce/view/ecommerce-account-payment-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Account: Payment',
};

export default function EcommerceAccountPaymentPage() {
  return <MainLayout><EcommerceAccountPaymentView /></MainLayout>;
}
