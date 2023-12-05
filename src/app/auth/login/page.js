import LoginBackgroundView from 'src/sections/auth/login-background-view';

import {Rend} from "./render"

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Login',
};

export default function LoginBackgroundPage() {
  return <Rend><LoginBackgroundView /></Rend>;
}
