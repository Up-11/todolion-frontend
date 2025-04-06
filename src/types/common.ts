import { ReactNode } from 'react'

export interface ISideBarItem {
	isActive?: boolean
	icon: ReactNode
	text: string
	link: string
	isExpanded?: boolean
}
export interface PropsWithClassName {
	className?: string
}
