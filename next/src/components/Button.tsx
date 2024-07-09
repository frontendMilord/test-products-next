'use client'

type ButtonTheme = 'neutral' | 'slate'
type ButtonType = 'submit' | 'reset' | 'button'
type ButtonStyles = {
	[buttonTheme in ButtonTheme]: string
}
interface ButtonProps {
	title: string
	onClick?: () => void
	theme: ButtonTheme
	type?: ButtonType
}

const buttonStyles: ButtonStyles = {
	slate: 'bg-slate-300 text-black hover:bg-slate-400 duration-150',
	neutral: 'bg-neutral-700 text-white hover:bg-neutral-600 duration-150',
}

const Button = ({
	onClick,
	theme,
	title,
	type,
}: ButtonProps & React.ComponentProps<'button'>) => {
	const styles = buttonStyles[theme] || ''
	return (
		<div className='block mx-auto'>
			<button
				type={type || 'button'}
				className={`${styles} rounded-md px-6 py-2 font-medium leading-5 text-base transition`}
				onClick={onClick}
			>
				{title}
			</button>
		</div>
	)
}

export default Button
