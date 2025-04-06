import React from 'react'

import { CreateNote } from '../modules/Note'

export const IndexPage: React.FC = () => {
	return (
		<section className='w-full flex flex-col '>
			<div className='mx-auto w-1/2'>
				<CreateNote />
			</div>
		</section>
	)
}
