import RegisterBackgroundView from 'src/sections/auth/register-background-view';

import {Rend} from "./render"

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Register',
};

export default function RegisterBackgroundPage() {
  return <Rend><RegisterBackgroundView /></Rend>;
}
