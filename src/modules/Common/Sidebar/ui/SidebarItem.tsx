import React from 'react'
import { NavLink } from 'react-router'

import { cn } from '../../../../shared/lib/css'
import { ISideBarItem } from '../../../../types/common'

export const SidebarItem: React.FC<ISideBarItem> = ({
	isActive,
	icon,
	text,
	link,
	isExpanded
}) => {
	return (
		<NavLink
			to={link}
			className={cn(
				'flex items-center py-4 gap-1 justify-center    rounded-3xl transition-colors cursor-pointer hover:bg-cyan-500/20',
				isActive && 'bg-cyan-600/20'
			)}
		>
			{icon}
			{isExpanded && <p className='text-md'> {text}</p>}
		</NavLink>
	)
}
