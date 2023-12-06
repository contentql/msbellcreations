// import ProtectedRoute from 'src/routes/components/protected-route';
import MainLayout from 'src/layouts/main';
import EcommerceWishlistView from 'src/sections/_ecommerce/view/ecommerce-wishlist-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Wishlist',
};

export default function EcommerceWishlistPage() {
  return <MainLayout><EcommerceWishlistView /></MainLayout>;
}
