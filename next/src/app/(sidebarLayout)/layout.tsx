import Sidebar from '@/components/layouts/sidebar'
import { NextAuthProvider } from '@/NextAuthProvider'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
	title: 'test-task',
}

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex pl-56'>
			<NextAuthProvider>
				<Sidebar />
				{children}
			</NextAuthProvider>
		</div>
	)
}
