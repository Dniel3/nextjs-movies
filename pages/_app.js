import '../styles/global.css'

import { Provider } from 'react-redux';
import store, { useTypedSelector } from '../redux/store';

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
  <Component {...pageProps} />
</Provider>;
}
