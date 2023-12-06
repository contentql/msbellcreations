import {ToastContainer} from "react-toastify"

import MainLayout from "src/layouts/main";
import EcommerceProductsView from 'src/sections/_ecommerce/view/ecommerce-products-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Products',
};

export default function EcommerceProductsPage() {
  return <>
   <ToastContainer />
   <MainLayout><EcommerceProductsView /></MainLayout>;
  </>
}
