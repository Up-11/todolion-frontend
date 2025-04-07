import { Heart } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router'

import { ROUTE_VALUES } from '../../config/routes'
import { Popover, PopoverContent, PopoverTrigger } from '../components/popover'

export const PagesListTest: React.FC = () => {
	return (
		<Popover>
			<PopoverTrigger className='fixed bottom-0 right-0'>
				<Heart />
			</PopoverTrigger>
			<PopoverContent>
				<div className='flex flex-col gap-1'>
					{ROUTE_VALUES.map(value => (
						<NavLink className='p-2 hover:bg-red-700/50' to={value} key={value}>
							{value}
						</NavLink>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
