import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	mutateFromContentToList,
	mutateFromListToContent
} from '../../../shared/utils/notes'
import { INoteSchema, NoteSchema } from '../schemas/Note.schema'

export const useNote = () => {
	const [isContent, setIsContent] = useState<'content' | 'list'>('content')
	const [isContentListExpanded, setIsContentListExpanded] = useState(true)

	const switchContent = () => {
		if (isContent === 'content') {
			const newContent = mutateFromContentToList(content!)
			form.setValue('content', '')
			form.setValue('contentList', newContent)
			setIsContent('list')
		} else {
			const newContent = mutateFromListToContent(contentList!)
			form.setValue('content', newContent)
			form.setValue('contentList', [])
			setIsContent('content')
		}
	}
	const form = useForm<INoteSchema>({
		resolver: zodResolver(NoteSchema),
		defaultValues: {
			title: '',
			content: '',
			contentList: [{ title: '', isDone: false }]
		}
	})

	const contentList = form.watch('contentList')
	const content = form.watch('content')

	const addContentListItem = () => {
		form.setValue('contentList', [
			...contentList!,
			{ title: '', isDone: false }
		])
	}

	const deleteContentListItem = (index: number) => {
		form.setValue(
			'contentList',
			contentList?.filter((_, i) => i !== index)
		)
	}
	return {
		isContent,
		isContentListExpanded,
		switchContent,
		addContentListItem,
		deleteContentListItem,
		form,
		setIsContent,
		setIsContentListExpanded,
		content,
		contentList
	}
}
