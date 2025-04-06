import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from './config/router'
import './index.css'

const firebaseConfig = {
	apiKey: 'AIzaSyBFZaX-sD0oPNtDHjLDo5HlIXIDJpCwJGM',
	authDomain: 'todos-64711.firebaseapp.com',
	projectId: 'todos-64711',
	storageBucket: 'todos-64711.firebasestorage.app',
	messagingSenderId: '246298964301',
	appId: '1:246298964301:web:549ced4cf396d9fd670704',
	measurementId: 'G-8S5RTP3SQB'
}
const app = initializeApp(firebaseConfig)

getAnalytics(app)

createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} />
)
