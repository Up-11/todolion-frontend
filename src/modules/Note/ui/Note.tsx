import { MoreVertical, Pin } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../shared/components/button'
import { Checkbox } from '../../../shared/components/checkbox'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '../../../shared/components/popover'
import { cn } from '../../../shared/lib/css'
import { INote } from '../../../types/common'

import { EditNoteDialog } from './EditNoteDialog'

export const Note: React.FC<{ note: INote }> = ({ note }) => {
	const { t } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div
			className={cn(
				'relative  group min-h-42 min-w-65 max-w-70 w-full bg-root transition-opacity rounded-3xl p-5  group',
				isOpen ? 'opacity-0' : 'opacity-100'
			)}
		>
			<EditNoteDialog isOpen={isOpen} setIsOpen={setIsOpen} note={note}>
				<div>
					<h2 className='font-bold text-xl line-clamp-2 cursor-default '>
						{note.title}
					</h2>
					<br className=' border-b h-1 border-b-black w-full' />
					{note.content && (
						<p className='font-medium text-md line-clamp-4 cursor-default '>
							{note.content}
						</p>
					)}
					{note.contentList && (
						<div className='flex flex-col z-20 relative gap-4'>
							{note.contentList
								.sort(a => (a.isDone === true ? 1 : -1))
								.slice(0, 3)
								.map(item => (
									<div className='flex items-center space-x-2 '>
										<Checkbox
											id={item.title}
											checked={item.isDone}
											disabled={item.isDone}
										/>
										<label
											htmlFor={item.title}
											className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-disabled:line-through'
										>
											{item.title}
										</label>
									</div>
								))}{' '}
						</div>
					)}
				</div>
			</EditNoteDialog>
			<Pin
				size={18}
				className={cn(
					'hover:text-cyan-500 group-hover:opacity-100  opacity-0  transition-all cursor-pointer absolute top-3 right-3',
					note.isPinned && 'text-cyan-600'
				)}
			/>
			<Popover>
				<PopoverTrigger className='absolute bottom-3 right-3'>
					<MoreVertical
						size={18}
						className='hover:text-cyan-500 group-hover:opacity-100  opacity-0  transition-all cursor-pointer '
					/>
				</PopoverTrigger>
				<PopoverContent className='max-w-45 flex flex-col gap-2' align='start'>
					<Button className='w-full' variant={'outline'}>
						{t('note.delete')}
					</Button>
					<Button className='w-full' variant={'outline'}>
						{t('tag.add')}
					</Button>
					<Button className='w-full' variant={'outline'}>
						{t('note.copy')}
					</Button>
					<Button className='w-full' variant={'outline'}>
						{t('note.archive')}
					</Button>
				</PopoverContent>
			</Popover>
		</div>
	)
}
