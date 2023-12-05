import MainLayout from 'src/layouts/main';
import EcommerceLandingView from 'src/sections/_ecommerce/view/ecommerce-landing-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Ms Bell Creations',
};

export default function HomePage() {
  return (
    <MainLayout>
      <EcommerceLandingView />
    </MainLayout>
  );
}
