import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Residents() {
	const { locationId } = useParams()
	const [residents, setResidents] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchResidents = async () => {
			setIsLoading(true)
			try {
				const response = await axios.get(
					`https://rickandmortyapi.com/api/location/${locationId}`
				)
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
		<div className='container mx-auto px-4 py-6'>
			<h1 className='text-2xl font-bold text-center mb-4'>{location.name}</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{residents.map(resident => (
					<div
						key={resident.id}
						className='bg-gray-200 rounded-lg p-4 shadow-md text-center'
					>
						<h2 className='text-lg font-semibold text-gray-800 mb-2'>
							{resident.name}
						</h2>
						<p className='text-sm text-gray-600 truncate'>
							<span className='font-bold'>Species:</span> {resident.species}
						</p>
						<p className='text-sm text-gray-600 truncate'>
							<span className='font-bold'>Status:</span> {resident.status}
						</p>
						<p className='text-sm text-gray-600 truncate'>
							<span className='font-bold'>Gender:</span> {resident.gender}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
