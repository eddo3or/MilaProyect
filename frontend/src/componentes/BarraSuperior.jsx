import {useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

export default function BarraSuperior({ Texto }) {
	var [date, setDate] = useState(new Date());
	useEffect( () => {
		var timer = setInterval(() => setDate(new Date(), 1000));
		return function cleanup() {
			clearInterval(timer);
		}
	});
	
	return (
		<div className="centrado-vertical">
			<div className="centrado-horizontal" style={{justifyContent: 'space-between'}}>
				<p>{date.toLocaleTimeString()}</p>
				<p>Nombre usuario</p>
			</div>

			<div className="centrado-horizontal">
				<div>
					<Texto/>
				</div>
				<div className="centrado-horizontal">
					<IconButton>
						<ArrowBackIcon/>
					</IconButton>
					<IconButton>
						<HomeIcon/>
					</IconButton>
				</div>
			</div>

		</div>
	);
}
