import React, { useState } from 'react';

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
	switch (path) {
		case 'patients':
			iframeUrl = 'https://hypaiq-patient.cyb.co.uk/';
			break;
		case 'scheduler':
			iframeUrl = 'https://hypa-scheduler.cyb.co.uk/';
			break;
		case 'admin':
			iframeUrl = 'https://hypaiq-admin.cyb.co.uk/settings';
			break;
		default:
			iframeUrl = '';
	}

	React.useEffect(() => {
		const theme_temp = {
			top_menu_dropdown_bg_color: '#4395A6',
			top_menu_dropdown_text_color: 'white',
		};
		// apiUrl.get('/uiobjects/styles').then(res => {
		// 	setTheme({ ...theme_temp, ...res.data });
		// 	setIsLoading(false);
		// });
	}, []);

	// if (isLoading) {
	// 	return <Spinner msg="Loading ..." theme={theme} />;
	// }

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
