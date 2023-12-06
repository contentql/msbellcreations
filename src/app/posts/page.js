import MainLayout from 'src/layouts/main';
import Ecommercepostsview from 'src/sections/_ecommerce/view/ecommerce-posts-view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Posts',
};

export default function EcommercePostsPage() {
  return <MainLayout><Ecommercepostsview /></MainLayout>;
}
