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
			iframeUrl = 'http://hypaiq-patient.cyb.co.uk/';
			break;
		case 'scheduler':
			iframeUrl = 'http://hypa-scheduler.cyb.co.uk/';
			break;
		case 'admin':
			iframeUrl = 'http://hypaiq-admin.cyb.co.uk/';
			break;
		default:
			iframeUrl = '';
	}

	// const menu_bg_color = styles.top_menu_button.passive_background_colour;
	// const menu_font_color = styles.top_menu_button.passive_text_colour;
	// const top_menu_dropdown_bg_color = styles.top_menu_button.passive_border_colour;
	// const top_menu_dropdown_text_color = styles.top_menu_button.passive_text_colour;

	React.useEffect(() => {
		const theme_temp = {
			menu_bg_color: '#0F1662',
			menu_font_color: 'white',
			menu_text_size: '16px',
			top_menu_dropdown_bg_color: '#4395A6',
			top_menu_dropdown_text_color: 'white',
		};
		apiUrl.get('/uiobjects/styles').then(res => {
			setTheme({ ...theme_temp, ...res.data });
			setIsLoading(false);
			// console.log(res.data)
		});
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
					style={{ border: 0 }}
					src={iframeUrl + `?token=${token}`}
					width="100%"
					height="600px"
				/>
			) : (
					<NotFound />
				)}
		</>
	);
}
