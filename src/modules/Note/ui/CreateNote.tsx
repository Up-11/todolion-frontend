import { AnimatePresence, motion } from 'framer-motion'
import { CheckSquare2, CheckSquare2Icon, Pen, Pin, Tag } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../shared/components/button'
import { Input } from '../../../shared/components/input'
import { Textarea } from '../../../shared/components/textarea'
import { AppTooltip } from '../../../shared/ui/AppTooltip'

export const CreateNote: React.FC = () => {
	const { t } = useTranslation()
	const [isCreating, setIsCreating] = useState<boolean>(false)

	return (
		<div>
			{isCreating && (
				<div
					className='fixed inset-0 z-10 '
					onClick={() => setIsCreating(false)}
				/>
			)}
			<AnimatePresence mode='popLayout'>
				{!isCreating ? (
					<motion.div
						key='create-note-short'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='w-full z-20  bg-root flex  items-center gap-2 py-1 rounded-3xl px-4 '
						onClick={() => setIsCreating(true)}
					>
						<Pen size={20} />
						<Input
							className='h-10 !bg-transparent !hover:bg-transparent !border-none !outline-0 active:!outline-0  '
							placeholder={t('note.creating')}
						/>
						<AppTooltip text={t('note.createList')}>
							<CheckSquare2 className='cursor-pointer' />
						</AppTooltip>
					</motion.div>
				) : (
					<motion.div
						key='create-note-full'
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className='bg-root relative rounded-3xl p-4 z-20'
					>
						<Input
							autoFocus={true}
							className='h-10 !bg-transparent !hover:bg-transparent !border-none !outline-0 active:!outline-0  '
							placeholder={t('note.title')}
						/>
						<Textarea
							placeholder={t('note.textarea')}
							className=' h-auto !bg-transparent !hover:bg-transparent !border-none !outline-0 active:!outline-0 resize-none '
							cols={8}
							rows={5}
						/>
						<Pin
							size={20}
							className='hover:text-cyan-500  transition-colors cursor-pointer absolute top-3 right-3'
						/>

						<div className='flex justify-between'>
							<div className='flex gap-2'>
								<AppTooltip text={t('note.createList')}>
									<CheckSquare2Icon
										size={20}
										className='hover:text-cyan-500  transition-colors cursor-pointer'
									/>
								</AppTooltip>
								<AppTooltip text={t('note.addTag')}>
									<Tag
										size={20}
										className='hover:text-cyan-500 transition-colors cursor-pointer'
									/>
								</AppTooltip>
							</div>
							<Button>{t('note.cancel')}</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
