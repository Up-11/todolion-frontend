import { Pen } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Input } from '../../../shared/components/input'
import { Textarea } from '../../../shared/components/textarea'

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
			<div className='z-20 relative'>
				{!isCreating ? (
					<div className='w-full  bg-root flex  items-center gap-2 py-1 rounded-3xl px-4 '>
						<Pen size={20} />
						<Input
							onClick={() => setIsCreating(true)}
							className='h-10 !bg-transparent !hover:bg-transparent !border-none !outline-0 active:!outline-0  '
							placeholder={t('note.creating')}
						/>
					</div>
				) : (
					<div className='bg-root  rounded-3xl p-4'>
						<Input
							autoFocus={true}
							onClick={() => setIsCreating(true)}
							className='h-10 !bg-transparent !hover:bg-transparent !border-none !outline-0 active:!outline-0  '
							placeholder={t('note.title')}
						/>
						<Textarea
							placeholder={t('note.textarea')}
							className=' h-auto !bg-transparent !hover:bg-transparent !border-none !outline-0 active:!outline-0 resize-none '
							cols={8}
							rows={5}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
