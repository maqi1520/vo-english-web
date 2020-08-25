import 'antd/dist/antd.css';
import '../styles/globals.css';
import AdmnLayout from '@/components/AdmnLayout';

import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname.indexOf('/admin') > -1) {
    return (
      <AdmnLayout>
        <Component {...pageProps} />
      </AdmnLayout>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
