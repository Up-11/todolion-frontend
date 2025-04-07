import React from 'react'
import { useTranslation } from 'react-i18next'

import { CreateNote } from '../modules/Note'
import { Note } from '../modules/Note/ui/Note'
import { useNotes } from '../shared/hooks/useNotes'
import { Loader } from '../shared/ui/Loader'

export const IndexPage: React.FC = () => {
	const { t } = useTranslation()
	const { notes, isLoading } = useNotes()

	return (
		<section className='w-full flex flex-col gap-5 '>
			<div className='mx-auto w-1/2'>
				<CreateNote />
			</div>
			<div className='w-full flex flex-col gap-5'>
				{isLoading ? (
					<Loader className='mx-auto size-14' />
				) : (
					<>
						<h2 className='mt-12 text-xl '>{t('page.pinned')}</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4 justify-items-center'>
							{notes
								.filter(note => note.isPinned)
								.map(note => (
									<Note note={note} key={note.id} />
								))}
						</div>
						<h2 className='mt-12 text-xl '>{t('page.others')}</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 justify-items-center 2xl:grid-cols-6'>
							{notes
								.filter(note => !note.isPinned)
								.map(note => (
									<Note note={note} key={note.id} />
								))}
						</div>
					</>
				)}
			</div>
		</section>
	)
}
