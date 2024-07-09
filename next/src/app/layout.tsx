import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextAuthProvider } from '@/NextAuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'test-task',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${inter.className} bg-slate-100`}>
				<ToastContainer />
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	)
}
