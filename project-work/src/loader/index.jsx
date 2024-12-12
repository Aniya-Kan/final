import React from 'react'
const Loader = () => {
	return (
		<div>
			<div className='flex items-center justify-center min-h-screen space-x-2'>
				<div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce'></div>
				<div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200'></div>
				<div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-400'></div>
			</div>
		</div>
	)
}

export default Loader
