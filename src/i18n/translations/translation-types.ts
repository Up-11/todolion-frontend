export interface TranslationTypes {
	page: {
		pinned: string
		noOtherNotes: string
		noNotes: string
		others: string
	}
	profile: {
		button: string
		language: string
		theme: string
		logout: string
	}
	note: {
		creating: string
		title: string
		desc: string
		cancel: string
		createList: string
		createText: string
		createListItem: string
		listItemPlaceholder: string
		delete: string
		copy: string
		updatedAt: string
		titleRequired: string
		contentRequired: string
		updated: string
		removed: string
		created: string
		completed: string
	}
	auth: {
		logout: {
			success: string
		}
		email: {
			label: string
			desc: string
		}
		password: {
			label: string
			desc: string
		}
		confirmPassword: {
			label: string
			desc: string
		}
		login: {
			title: string
			btn: string
			q: string
			link: string
			success: string
		}
		register: {
			title: string
			btn: string
			q: string
			link: string
			success: string
		}
	}
	theme: {
		light: string
		dark: string
		system: string
	}
	header: {
		refresh: string
	}
}
