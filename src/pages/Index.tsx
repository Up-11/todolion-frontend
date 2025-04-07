import React from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { CreateNote } from '../modules/Note'
import { Note } from '../modules/Note/ui/Note'
import { INote } from '../types/common'

const mockNotes: INote[] = [
	{
		id: uuidv4(),
		title: 'Заметка 1',
		isPinned: true,
		updatedAt: new Date(),
		isList: false,
		content: 'Это содержимое первой заметки.'
	},
	{
		id: uuidv4(),
		title: 'Заметка 2',
		isPinned: false,
		updatedAt: new Date(),
		isList: true,
		contentList: [
			{ title: 'Элемент списка 1', isDone: true },
			{ title: 'Элемент списка 3', isDone: false },
			{ title: 'Элемент списка 2', isDone: false }
		]
	},
	{
		id: uuidv4(),
		title: 'Заметка 3',
		isPinned: true,
		updatedAt: new Date(),
		isList: false,
		content: 'Это содержимое третьей заметки.'
	},
	{
		id: uuidv4(),
		title: 'Заметка 4',
		isPinned: false,
		updatedAt: new Date(),
		isList: true,
		contentList: [
			{ title: 'Элемент списка 3', isDone: true },
			{ title: 'Элемент списка 4', isDone: true },
			{ title: 'Элемент списка 5', isDone: false }
		]
	},
	{
		id: uuidv4(),
		title: 'Заметка 5',
		isPinned: true,
		updatedAt: new Date(),
		isList: false,
		content: 'Это содержимое пятой заметки.'
	},
	{
		id: uuidv4(),
		title: 'Заметка 6',
		isPinned: false,
		updatedAt: new Date(),
		isList: true,
		contentList: [
			{ title: 'Элемент списка 6', isDone: false },
			{ title: 'Элемент списка 7', isDone: true }
		]
	}
]

export const IndexPage: React.FC = () => {
	const { t } = useTranslation()

	return (
		<section className='w-full flex flex-col '>
			<div className='mx-auto w-1/2'>
				<CreateNote />
			</div>
			<h2 className='mt-12 text-xl '>{t('page.pinned')}</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 justify-items-center'>
				{mockNotes.map(item => (
					<Note note={item} />
				))}
			</div>
		</section>
	)
}
