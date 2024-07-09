'use client'

import SignOutButton from '../auth/SignOutButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Sidebar = () => {
	const pathname = usePathname()
	const session = useSession()

	if (session.status === 'loading') {
		return <div>Loading...</div>
	}

	return (
		<div className='fixed top-0 left-0 h-screen w-56 bg-slate-100 flex flex-col'>
			<div className='h1-text flex items-center gap-1 justify-center py-3 text-slate-100 mb-6 bg-gray-800 rounded-br-2xl'>
				Test
				<svg
					width='34'
					height='31'
					viewBox='0 0 34 31'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M6.35098 0.178467C5.56954 0.178467 4.8201 0.488893 4.26754 1.04146L2.22598 3.08302C-0.075326 5.38432 -0.075326 9.11547 2.22598 11.4168C4.32722 13.518 7.62052 13.7007 9.92902 11.9648C10.9134 12.7037 12.138 13.1428 13.4643 13.1428C14.7908 13.1428 16.0156 12.7036 17 11.9644C17.9844 12.7036 19.2092 13.1428 20.5357 13.1428C21.862 13.1428 23.0866 12.7037 24.071 11.9648C26.3795 13.7007 29.6728 13.518 31.774 11.4168C34.0753 9.11547 34.0753 5.38432 31.774 3.08302L29.7325 1.04146C29.1799 0.4889 28.4305 0.178474 27.649 0.178474L6.35098 0.178467Z'
						fill='#E2E8F0'
					/>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M2.85714 28.4642V14.7065C5.0889 15.7648 7.69698 15.764 9.92926 14.7053C11.0013 15.2143 12.201 15.4999 13.4643 15.4999C14.7278 15.4999 15.9278 15.2142 17 14.705C18.0722 15.2142 19.2722 15.4999 20.5357 15.4999C21.799 15.4999 22.9987 15.2143 24.0707 14.7053C26.303 15.764 28.9111 15.7648 31.1429 14.7065V28.4642H32.3214C32.9723 28.4642 33.5 28.9919 33.5 29.6428C33.5 30.2937 32.9723 30.8213 32.3214 30.8213H1.67857C1.02766 30.8213 0.5 30.2937 0.5 29.6428C0.5 28.9919 1.02766 28.4642 1.67857 28.4642H2.85714ZM7.57143 19.0356C7.57143 18.3847 8.09909 17.857 8.75 17.857H13.4643C14.1152 17.857 14.6429 18.3847 14.6429 19.0356V23.7499C14.6429 24.4008 14.1152 24.9285 13.4643 24.9285H8.75C8.09909 24.9285 7.57143 24.4008 7.57143 23.7499V19.0356ZM20.5357 17.857C19.8848 17.857 19.3571 18.3847 19.3571 19.0356V27.2856C19.3571 27.9365 19.8848 28.4642 20.5357 28.4642H25.25C25.9009 28.4642 26.4286 27.9365 26.4286 27.2856V19.0356C26.4286 18.3847 25.9009 17.857 25.25 17.857H20.5357Z'
						fill='#E2E8F0'
					/>
				</svg>
			</div>
			<ul className='p-[10px] flex flex-col gap-4'>
				<li>
					<Link
						href={'/products'}
						className='w-full pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group'
					>
						<h3>Товары</h3>
						<svg
							className={`${pathname === '/products' && 'hidden'} 
                transition-transform duration-300 group-hover:translate-x-1.5
              `}
							width='20'
							height='18'
							viewBox='0 0 20 18'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M11.2197 0.96967C11.5126 0.676777 11.9874 0.676777 12.2803 0.96967L19.7803 8.46967C19.921 8.61032 20 8.80109 20 9C20 9.19891 19.921 9.38968 19.7803 9.53033L12.2803 17.0303C11.9874 17.3232 11.5126 17.3232 11.2197 17.0303C10.9268 16.7374 10.9268 16.2626 11.2197 15.9697L17.4393 9.75H1.25C0.835786 9.75 0.5 9.41421 0.5 9C0.5 8.58579 0.835786 8.25 1.25 8.25H17.4393L11.2197 2.03033C10.9268 1.73744 10.9268 1.26256 11.2197 0.96967Z'
								fill='#1E293B'
							/>
						</svg>
					</Link>
				</li>
				<li>
					<Link
						href={'/algorithms'}
						className='w-full pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group'
					>
						<h3>Алгоритмы</h3>
						<svg
							className={`${pathname === '/algorithms' && 'hidden'} 
                transition-transform duration-300 group-hover:translate-x-1.5
              `}
							width='20'
							height='18'
							viewBox='0 0 20 18'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M11.2197 0.96967C11.5126 0.676777 11.9874 0.676777 12.2803 0.96967L19.7803 8.46967C19.921 8.61032 20 8.80109 20 9C20 9.19891 19.921 9.38968 19.7803 9.53033L12.2803 17.0303C11.9874 17.3232 11.5126 17.3232 11.2197 17.0303C10.9268 16.7374 10.9268 16.2626 11.2197 15.9697L17.4393 9.75H1.25C0.835786 9.75 0.5 9.41421 0.5 9C0.5 8.58579 0.835786 8.25 1.25 8.25H17.4393L11.2197 2.03033C10.9268 1.73744 10.9268 1.26256 11.2197 0.96967Z'
								fill='#1E293B'
							/>
						</svg>
					</Link>
				</li>
			</ul>
			<div className='mt-auto p-5 text-slate-900'>
				<div className='flex space-x-2 mb-4'>
					{session?.data?.user?.roles?.map((role) => (
						<span
							key={role.id}
							className='bg-gray-300 px-2 py-1 rounded-full text-sm'
						>
							{role.name}
						</span>
					))}
				</div>
				<div className='w-full flex justify-between items-center'>
					<h6 className='text-base text-slate-900'>
						{session?.data?.user.name}
					</h6>
					<SignOutButton />
				</div>
			</div>
		</div>
	)
}

export default Sidebar
