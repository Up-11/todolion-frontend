import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Checkbox } from '../../../shared/components/checkbox'
import { Input } from '../../../shared/components/input'
import { cn } from '../../../shared/lib/css'

interface ContentListItemProps {
	item: { title: string; isDone: boolean }
	onUpdate: (updatedItem: { title: string; isDone: boolean }) => void
	onDelete: () => void
}

export const ContentListItem: React.FC<ContentListItemProps> = ({
	item,
	onUpdate,
	onDelete
}) => {
	const { t } = useTranslation()
	return (
		<div className='flex items-center space-x-2'>
			<Checkbox
				id={item.title}
				checked={item.isDone}
				onCheckedChange={(e: boolean) => {
					onUpdate({ ...item, isDone: e })
				}}
				className={cn('size-5')}
			/>
			<div className='flex relative w-full group'>
				<Input
					className={cn(
						'!text-lg !bg-transparent !border-none font-medium leading-none',
						item.isDone && 'line-through'
					)}
					value={item.title}
					disabled={item.isDone}
					placeholder={t('note.listItemPlaceholder')}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						onUpdate({ ...item, title: e.target.value })
					}}
				/>
				<X
					onClick={onDelete}
					className='absolute right-0 top-0 m-2 opacity-0 group-hover:opacity-100 size-5 hover:bg-destructive/70 cursor-pointer transition-all rounded-full'
				/>
			</div>
		</div>
	)
}
