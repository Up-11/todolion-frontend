import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	orderBy,
	query,
	setDoc,
	updateDoc
} from 'firebase/firestore'
import { createContext, PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

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
	createNote: (note: INote, onFinished?: () => void) => void
	togglePinned: (noteId: string) => void
}

const initialState: NotesProviderState = {
	notes: [],
	setNotes: () => {},
	isLoading: false,
	setIsLoading: () => {},
	getNotes: () => {},
	deleteNote: () => {},
	createNote: () => {},
	togglePinned: () => {}
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
			if (!user) return

			const getData = query(
				collection(db, `users/${user.uid}/notes`),
				orderBy('updatedAt', 'desc')
			)
			const listDocs = await getDocs(getData)

			const newNotes = listDocs.docs.map(doc => doc.data() as INote)
			setNotes(newNotes)
		} catch (error) {
			console.error('Error fetching notes:', error)
		} finally {
			setGlobalLoading(false)
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

	const createNote = async (note: INote, onFinished?: () => void) => {
		if (!user?.uid) return
		try {
			setGlobalLoading(true)

			const payload: INote = {
				title: note.title,
				content: note.content,
				contentList: note.contentList,
				isPinned: note.isPinned,
				id: uuidv4(),
				updatedAt: new Date().toLocaleTimeString()
			}

			await setDoc(doc(db, `users/${user.uid}/notes/${payload.id}`), payload)
			toast.success(t('note.created'))
			onFinished?.()
			setGlobalLoading(false)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			toast.error(err.message)
			setGlobalLoading(false)
		} finally {
			getNotes()
		}
	}

	const togglePinned = async (noteId: string) => {
		try {
			setGlobalLoading(true)
			if (!user) return

			const noteRef = doc(db, `users/${user.uid}/notes/${noteId}`)
			const noteSnap = await getDoc(noteRef)

			if (noteSnap.exists()) {
				const note = noteSnap.data() as INote
				await updateDoc(noteRef, { isPinned: !note.isPinned })
			}
		} catch (error) {
			console.error('Error toggling pinned:', error)
		} finally {
			getNotes()
			setGlobalLoading(false)
		}
	}

	return (
		<NotesContext.Provider
			value={{
				notes,
				setNotes,
				isLoading,
				setIsLoading,
				getNotes,
				deleteNote,
				createNote,
				togglePinned
			}}
		>
			{children}
		</NotesContext.Provider>
	)
}
