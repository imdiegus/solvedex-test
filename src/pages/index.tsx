import { GetServerSideProps } from 'next/types'
import axios from 'axios'
import { City, SelectInterface } from '@/interfaces/countries'
import Select from 'react-select'
import { useCallback, useEffect, useState } from 'react'
import Icon from '@/components/commonComponents/Icon'
import { RotateLoader } from 'react-spinners'
import { weatherInterface } from '@/interfaces/weather'
import WeatherCard from '@/components/home/WeatherCard'

type Props = {
	cities: City[]
}

export default function Home({ cities }: Props) {

	const [citiesOptions, setCitiesOptions] = useState<SelectInterface[]>([])
	const [selected, setSelected] = useState<SelectInterface | undefined>()
	const [loading, setLoading] = useState(false)
	const [weather, setWeather] = useState<weatherInterface>()

	const getWeather = useCallback(async (selectedItem: SelectInterface | undefined) => {
		try {
			setLoading(true)
			const res = await axios.get<weatherInterface>(process.env.NEXT_PUBLIC_WEATHER_URL ?? '', {
				params: {
					appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY,
					lat: selectedItem?.value.latitude,
					lon: selectedItem?.value.longitude,
				}
			})
			setWeather(res.data)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (cities) {
			setCitiesOptions(cities.map(item => ({
				label: item.name,
				value: item
			})))
		}
	}, [cities])

	useEffect(() => {
		if (selected?.value) {
			getWeather(selected)
		}
	}, [selected])


	return (
		<div style={{
			backgroundImage: 'url("/bg.svg")',
			backgroundSize: 'auto',
			backgroundClip: 'padding-box'
		}}>
			<div className='mainContainer'>
				<h1 className='mainTitle'>
					Solvedex Weather App
				</h1>
				<Select
					placeholder='Search Here'
					styles={{
						control: (baseStyles) => ({
							...baseStyles,
							backgroundColor: '#24353E',
							border: 'none'
						}),
						input: (baseStyles) => ({
							...baseStyles,
							backgroundColor: '#24353E',
							color: '#ffffff',
						}),
						placeholder: (baseStyles) => ({
							...baseStyles,
							color: '#ffffff',
						}),
						indicatorSeparator: () => ({
							display: 'none'
						})
					}}
					options={citiesOptions}
					onChange={e => {
						if (e?.value && e?.label)
							setSelected({ value: e.value, label: e.label })
					}}
					value={selected}
				/>
				{loading &&
					<div>
						<RotateLoader color="#ffffff" loading />
					</div>
				}
				{(weather && !loading) && <WeatherCard
					weather={weather}
				/>}
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const res = await axios.get(`${process.env.COUNTRY_URL}/` ?? '', {
		headers: {
			'X-Api-Key': process.env.NIJA_API_KEY
		},
		params: {
			country: 'us',
			limit: 60
		}
	});
	return { props: { cities: res.data } };
};
