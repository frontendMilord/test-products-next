'use client'
import { generatePages } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

interface IPaginationProps {
	totalPages: number
}

const Pagination = ({ totalPages }: IPaginationProps) => {
	const searchParams = useSearchParams()
	const currentPage = Number(searchParams.get('page')) || 1
	const pages = generatePages(currentPage, totalPages)
	const pathname = usePathname()

	const createPageURL = (page: number | string) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', page?.toString())
		return `${pathname}?${params.toString()}`
	}

	if (!totalPages) {
		return null
	}

	return (
		<div className='flex justify-center items-center gap-x-3 select-none'>
			<PaginationArrow
				direction='left'
				href={createPageURL(currentPage - 1)}
				isDisabled={currentPage <= 1}
			/>
			{pages.map((page, index) => (
				<React.Fragment key={index}>
					{currentPage === page || page === '...' ? (
						<div
							className={`${currentPage === page && 'bg-slate-200'} 
                flex h-10 w-10 items-center justify-center px-2 py-1
              `}
						>
							{page}
						</div>
					) : (
						<Link
							href={createPageURL(page)}
							className={`flex h-10 w-10 items-center justify-center px-2 py-1`}
						>
							{page}
						</Link>
					)}
				</React.Fragment>
			))}
			<PaginationArrow
				direction='right'
				href={createPageURL(currentPage + 1)}
				isDisabled={currentPage >= totalPages}
			/>
		</div>
	)
}

function PaginationArrow({
	href,
	direction,
	isDisabled,
}: {
	href: string
	direction: 'left' | 'right'
	isDisabled?: boolean
}) {
	const className = `
    ${isDisabled && 'pointer-events-none'}
    ${direction === 'right' && 'rotate-180'}
  `

	const icon = (
		<svg
			width='16'
			height='17'
			viewBox='0 0 16 17'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M6.71967 7.96967C6.42678 8.26256 6.42678 8.73744 6.71967 9.03033L14.2197 16.5303C14.5126 16.8232 14.9874 16.8232 15.2803 16.5303C15.5732 16.2374 15.5732 15.7626 15.2803 15.4697L8.31066 8.5L15.2803 1.53033C15.5732 1.23744 15.5732 0.762563 15.2803 0.46967C14.9874 0.176777 14.5126 0.176777 14.2197 0.46967L6.71967 7.96967Z'
				fill='#0F172A'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M0.719669 7.96967C0.426776 8.26256 0.426776 8.73744 0.719669 9.03033L8.21967 16.5303C8.51256 16.8232 8.98744 16.8232 9.28033 16.5303C9.57322 16.2374 9.57322 15.7626 9.28033 15.4697L2.31066 8.5L9.28033 1.53033C9.57322 1.23744 9.57322 0.762563 9.28033 0.46967C8.98744 0.176777 8.51256 0.176777 8.21967 0.46967L0.719669 7.96967Z'
				fill='#0F172A'
			/>
		</svg>
	)

	return isDisabled ? <div>{icon}</div> : <Link href={href}>{icon}</Link>
}

export default Pagination
