import MainLayout from 'src/layouts/main';
import EcommerceCompareView from 'src/sections/_ecommerce/view/ecommerce-compare-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Compare',
};

export default function EcommerceComparePage() {
  return <MainLayout><EcommerceCompareView /></MainLayout>;
}
