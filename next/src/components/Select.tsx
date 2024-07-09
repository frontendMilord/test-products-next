import React, { useState } from 'react'

interface SelectProps<T> {
	defaultValue: string
	options: Array<{ value: T; label: string }>
	selectedOption: { value: T; label: string }
	onChange: (value: T) => void
}

const Select = <T,>({
	onChange,
	options,
	selectedOption,
	defaultValue = 'Выбрать',
}: SelectProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleIsOpen = () => {
		setIsOpen((prev) => !prev)
	}

	const handleOnChange = (newSelectedValue: T) => {
		handleIsOpen()
		if (newSelectedValue === selectedOption.value) {
			return
		}
		onChange(newSelectedValue)
	}

	return (
		<div>
			<div
				className={`w-full flex justify-between items-center py-2 px-3 text-sm bg-[#C9CFD8] rounded-md cursor-pointer
          ${isOpen && 'rounded-b-none'}  
        `}
				onClick={handleIsOpen}
			>
				<div className='text-[#11182766]'>
					{selectedOption.label || defaultValue}
				</div>
				<div className={`${isOpen && 'rotate-180'} duration-300`}>
					<svg
						width='17'
						height='10'
						viewBox='0 0 17 10'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M9.28033 9.28033C8.98744 9.57322 8.51256 9.57322 8.21967 9.28033L0.71967 1.78033C0.426777 1.48744 0.426777 1.01256 0.71967 0.719671C1.01256 0.426777 1.48744 0.426777 1.78033 0.719671L8.75 7.68934L15.7197 0.71967C16.0126 0.426777 16.4874 0.426777 16.7803 0.71967C17.0732 1.01256 17.0732 1.48744 16.7803 1.78033L9.28033 9.28033Z'
							fill='#1E293B'
						/>
					</svg>
				</div>
			</div>
			<div className='relative'>
				<div className='absolute top-0 left-0 w-full max-h-64 overflow-y-auto'>
					{isOpen &&
						options.map((option) => (
							<div
								key={option.label}
								className={`${
									option.value === selectedOption.value
										? 'text-zinc-600'
										: 'text-[#11182766]'
								}
              bg-[#C9CFD8] text-sm px-3 py-[6px] last:rounded-bl-md last:rounded-br-md cursor-pointer select-none 
              overflow-x-hidden break-words
            `}
								onClick={() => handleOnChange(option.value)}
							>
								{option.label}
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default Select
