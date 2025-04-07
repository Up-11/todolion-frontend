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

export interface INote {
	id: string
	title: string
	isPinned: boolean
	updatedAt: string
	content?: string
	contentList?: { title: string; isDone: boolean }[]
}
