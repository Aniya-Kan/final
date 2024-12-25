import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Residents.css'

export default function Residents() {
	const { locationId } = useParams()
	const [location, setLocation] = useState([])
	const [residents, setResidents] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchResidents = async () => {
			setIsLoading(true)
			try {
				const response = await axios.get(
					`https://rickandmortyapi.com/api/location/${locationId}`
				)
				setLocation(response.data)
				const residentsData = await Promise.all(
					response.data.residents.map(url =>
						axios.get(url).then(res => res.data)
					)
				)
				setResidents(residentsData)
			} catch (error) {
				console.error('Failed to fetch residents:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchResidents()
	}, [locationId])

	if (isLoading) return <div>Loading...</div>

	return (
		<div className='residents-Bg'>
			<div className='container'>
				<h1 className='location-title'>{location.name}</h1>
				<div className='residents-grid'>
					{residents.length > 0 ? (
						residents.map(resident => (
							<div key={resident.id} className='resident-card'>
								<div className='resident-image-container'>
									<img
										src={resident.image}
										alt={resident.name}
										className='resident-image'
									/>
								</div>
								<h2 className='resident-name'>{resident.name}</h2>
								<div className='status-container'>
									<span
										className={`status-indicator ${
											resident.status === 'Alive'
												? 'status-alive'
												: resident.status === 'Dead'
												? 'status-dead'
												: 'status-unknown'
										}`}
									></span>
									<span className='resident-status'>
										{resident.status} - {resident.species}
									</span>
								</div>
								<p className='resident-detail'>
									<span className='font-bold'>Gender:</span> {resident.gender}
								</p>
								<p className='resident-detail'>
									<span className='font-bold'>Origin:</span>{' '}
									{resident.origin.name || 'Unknown'}
								</p>
							</div>
						))
					) : (
						<p className='residents-no'>This location doesn't have residents</p>
					)}
				</div>
			</div>
		</div>
	)
}
