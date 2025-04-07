import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	orderBy,
	query
} from 'firebase/firestore'
import { createContext, PropsWithChildren, useState } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { INote } from '../../types/common'
import { useAuth } from '../hooks/useAuth'
import { useGlobalLoading } from '../hooks/useGlobalLoading'

interface NotesProviderState {
	notes: INote[]
	setNotes: (notes: INote[]) => void
	isLoading: boolean
	setIsLoading: (isLoading: boolean) => void
	getNotes: () => void
	deleteNote: (noteId: string) => void
}

const initialState: NotesProviderState = {
	notes: [],
	setNotes: () => {},
	isLoading: false,
	setIsLoading: () => {},
	getNotes: () => {},
	deleteNote: () => {}
}

export const NotesContext = createContext<NotesProviderState>(initialState)

export function NotesProvider({ children }: PropsWithChildren) {
	const db = getFirestore()
	const { user } = useAuth()
	const { setGlobalLoading } = useGlobalLoading()
	const { t } = useTranslation()

	const [notes, setNotes] = useState<INote[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getNotes = async (): Promise<INote[] | void> => {
		try {
			setGlobalLoading(true)
			setIsLoading(true)
			if (!user) return

			const getData = query(
				collection(db, `users/${user.uid}/notes`),
				orderBy('updatedAt', 'desc')
			)
			const listDocs = await getDocs(getData)

			const newNotes = listDocs.docs.map(doc => doc.data() as INote)
			setNotes(newNotes)
			console.log(newNotes)
		} catch (error) {
			console.error('Error fetching notes:', error)
		} finally {
			setGlobalLoading(false)
			setIsLoading(false)
		}
	}
	const deleteNote = async (noteId: string) => {
		try {
			setGlobalLoading(true)
			setIsLoading(true)
			if (!user) return

			const noteRef = doc(db, `users/${user.uid}/notes/${noteId}`)
			await deleteDoc(noteRef)
			toast.success(t('note.removed'))
		} catch (error) {
			console.error('Error removing note:', error)
		} finally {
			setGlobalLoading(false)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getNotes()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<NotesContext.Provider
			value={{ notes, setNotes, isLoading, setIsLoading, getNotes, deleteNote }}
		>
			{children}
		</NotesContext.Provider>
	)
}
