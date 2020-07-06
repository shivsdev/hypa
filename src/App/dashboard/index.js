import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../calls/apis';
import TopMenu from './components/TopMenu';
import Spinner from './components/Spinner';
import NotFound from './components/NotFound';

export default function Dashboard({ history, authObj, location }) {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(null);
  const token = window.sessionStorage.getItem('token');
  const path = location.pathname.split('/')[2];

  let iframeUrl = '';
  let url = window.location.origin;
  let client = 'https://hypaiq.cyb.co.uk';
  // let dev = 'https://hypaiqdev.cyb.co.uk';
  switch (path) {
    case 'patients':
      iframeUrl =
        url === client
          ? 'https://hypaiq-patient.cyb.co.uk/'
          : 'https://hypaiqdev-patient.cyb.co.uk/';
      break;
    case 'scheduler':
      iframeUrl =
        url === client
          ? 'https://hypa-scheduler.cyb.co.uk/'
          : 'https://hypadev-scheduler.cyb.co.uk/';
      break;
    case 'admin':
      iframeUrl =
        url === client
          ? 'https://hypaiq-admin.cyb.co.uk/settings'
          : 'https://hypaiqdev-admin.cyb.co.uk/settings';
      break;
    default:
      iframeUrl = '';
  }

  React.useEffect(() => {
    const theme_temp = {
      top_menu_dropdown_bg_color: '#4395A6',
      top_menu_dropdown_text_color: 'white',
    };
    let styles = sessionStorage.getItem('styles');
    let sty = JSON.parse(styles);
    setTheme({ ...theme_temp, ...sty });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner msg="Loading ..." theme={theme} />;
  }

  return (
    <>
      <TopMenu
        theme={theme}
        history={history}
        authObj={authObj}
        setIsLoading={setIsLoading}
      />

      {iframeUrl ? (
        <iframe
          style={{ border: 0, height: 'calc(100vh - 70px)' }}
          src={iframeUrl + `?token=${token}`}
          width="100%"
          title="microfrontend"
        />
      ) : (
        <NotFound />
      )}
    </>
  );
}
