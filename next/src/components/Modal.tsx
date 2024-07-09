'use client'

import { useEffect } from 'react'
import Button from './Button'

interface IModalProps {
	children: React.ReactNode
	z?: number
	leftButtonTitle: string
	rightButtonTitle: string
	onLeftButtonClick: () => void
	onRightButtonClick: () => void
	onClose: () => void
	containerClassNames?: string
}

const Modal = ({
	children,
	z = 10,
	leftButtonTitle,
	rightButtonTitle,
	onLeftButtonClick,
	onRightButtonClick,
	onClose,
	containerClassNames = `flex flex-col items-center py-4 px-3 rounded-xl bg-slate-100`,
}: IModalProps) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])

	return (
		<div
			className={`fixed top-0 left-0 bg-black bg-opacity-70 z-[${z}] h-screen max-h-screen overflow-y-auto w-full flex flex-col justify-center items-center`}
			onClick={onClose}
		>
			<div
				className={`max-h-full ${containerClassNames}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
				<div className='mt-4 flex justify-end gap-x-3 px-2 bg-transparent'>
					<div>
						<Button
							theme='neutral'
							title={leftButtonTitle}
							onClick={onLeftButtonClick}
						/>
					</div>
					<div>
						<Button
							theme='slate'
							title={rightButtonTitle}
							onClick={onRightButtonClick}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
