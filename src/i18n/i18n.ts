import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './translations/en_translation.json'
import ru from './translations/ru_translation.json'
import { TranslationTypes } from './translations/translation-types'

const typedRecourses: Record<string, { translation: TranslationTypes }> = {
	en: { translation: en },
	ru: { translation: ru }
}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: typedRecourses,
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupLocalStorage: 'i18nextLng'
		},
		fallbackLng: 'ru',
		interpolation: {
			escapeValue: false
		}
	})

export default i18n
