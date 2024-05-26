import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Layout from './layout/layout';
import Routes from './routers/router-web';
import { LevaProvider } from './context/leva-context';

function Root() {
  const preventDefaults = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  useEffect(() => {
    window.addEventListener('drop', preventDefaults, false);
    window.addEventListener('dragover', preventDefaults, false);
    return () => {
      window.removeEventListener('drop', preventDefaults, false);
      window.removeEventListener('dragover', preventDefaults, false);
    };
  });
  return (
    <BrowserRouter basename="/">
      <HelmetProvider>
        <LevaProvider>
          <Layout>
            <Routes />
            <div className="app__toastify" id="ToastHolder" />
          </Layout>
        </LevaProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default Root;
