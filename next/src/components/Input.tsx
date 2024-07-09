import React, { ChangeEvent } from 'react'

interface InputProps {
	id?: string
	name?: string
	required?: boolean
	placeholder: string
	type?: 'text' | 'email' | 'password'
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
	placeholder,
	type = 'text',
	id,
	required,
	name = '',
	onChange,
	...rest
}: InputProps & React.ComponentProps<'input'>) => {
	return (
		<input
			{...rest}
			id={id}
			name={name}
			required={required}
			placeholder={placeholder}
			type={type}
			onChange={onChange}
			className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
		/>
	)
}

export default Input
