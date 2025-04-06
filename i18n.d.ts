import { TranslationTypes } from './src/i18n/translations/translation-types'
import 'i18next'

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: TranslationTypes
	}
}
