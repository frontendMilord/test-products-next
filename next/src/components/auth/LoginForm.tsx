'use client'

import { authenticate } from '@/lib/actions'
import { useFormState } from 'react-dom'
import Input from '../Input'
import Button from '../Button'

const LoginForm = () => {
	const [errorMessage, formAction, isPending] = useFormState(
		authenticate,
		undefined
	)

	return (
		<form
			action={formAction}
			className='bg-slate-200 px-8 py-7 rounded-[10px] shadow-md w-[360px] flex flex-col gap-10'
		>
			<h2 className='text-center'>Авторизация</h2>
			<div className='flex flex-col gap-9 pt-8 pb-[10px]'>
				<div className='flex flex-col gap-1'>
					<h6>Почта</h6>
					<Input
						placeholder='Почта'
						type='email'
						id='email'
						name='email'
						required={true}
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<h6>Пароль</h6>
					<Input
						placeholder='Пароль'
						type='password'
						id='password'
						name='password'
						required={true}
					/>
				</div>
			</div>
			<Button
				theme='slate'
				title='Войти'
				type='submit'
				aria-disabled={isPending}
			/>
			{errorMessage && (
				<p className='text-base font-medium text-red-500'>
					{errorMessage.toString()}
				</p>
			)}
		</form>
	)
}

export default LoginForm
