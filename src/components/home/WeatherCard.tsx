import temperatureConverter from '@/helpers/temperatureConverter'
import { weatherInterface, weatherMain } from '@/interfaces/weather'
import React, { useCallback, useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { iconsType } from '@/interfaces/icons'
import Icon from '../commonComponents/Icon'

type Props = {
	weather: weatherInterface
	city: string
}

export default function HomePage({ weather, city }: Props) {

	const [temp, setTemp] = useState<{ temp: number, type: 'c' | 'f' }>({ type: 'f', temp: 0 })

	const getIconName = useCallback((type: weatherMain): iconsType => {
		console.log(type)

		const time = DateTime.now()
		switch (type) {
			case 'Clear': {
				if (time.hour > 18) {
					return 'Clearn Night'
				}
				return 'Sunny'
			}

			case 'Clouds':
				if (time.hour > 18) {
					return 'Cloudny Night'
				}
				return 'Sunny with cloud'


			case 'Rain':
			case 'Drizzle':
				if (time.hour > 18) {
					return 'Rain'
				}
				return 'Sunny Rain'

			case 'Thunderstorm':
				return 'Thunder'

			case 'Snow':
				return 'Snowy'

			default: return 'Star'
		}
	}, [])

	const handleChangeDegree = () => {
		setTemp({ temp: temperatureConverter(temp.type === 'c' ? 'f' : 'c', temp.temp), type: temp.type === 'c' ? 'f' : 'c' })
	}

	const time = DateTime.now();

	useEffect(() => {
		setTemp({ temp: parseFloat((weather.main.temp - 273.15).toFixed(1)), type: 'c' })
	}, [weather])


	return (
		<div className='weatherContainer'>
			<div className='icon'><Icon
				icon={getIconName(weather.weather[0].main)}
			/></div>
			<div className='cardBg'>
				<div>
					<div className='temperature'>
						<p className='city'>{city}</p>
						<span
							id='temperatureDegrees'
							className='degrees'
							onClick={handleChangeDegree}
						>
							{temp.temp}°{temp.type}
						</span>
					</div>
					<div>
						<div>
							<p className='description'>wind speed: <span className='degrees'>{weather.wind.speed}</span></p>
							<p className='description'>{time.toFormat('cccc')} <span className='degrees'>{time.toLocaleString(DateTime.TIME_24_SIMPLE)}</span></p>
							<p className='description'>{weather.weather[0].main}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}