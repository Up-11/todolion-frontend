import { useContext } from 'react'

import { NotesContext } from '../providers/NotesProvider'

export const useNotes = () => {
	const context = useContext(NotesContext)
	return context
}
