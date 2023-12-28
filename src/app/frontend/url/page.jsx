import Qrcode from "src/sections/frontend/qrcode";
import MainLayout from "src/layouts/main";


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Msbell creations',
};

export default function Qrcodebackground() {
  return <MainLayout><Qrcode /></MainLayout>;
}
