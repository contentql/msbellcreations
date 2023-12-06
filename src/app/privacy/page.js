import MainLayout from 'src/layouts/main';
import EcommerceLegalPrivacy from 'src/sections/_ecommerce/legal/ecommerce-legal-privacy';

export const metadata = {
  title: 'privacy',
};

export default function EcommercePrivacyPage() {
  return <MainLayout><EcommerceLegalPrivacy /></MainLayout>;
}
