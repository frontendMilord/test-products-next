'use server'

import { signIn, signOut } from '../auth'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'

export const signOutAction = async () => {
	await signOut({ redirectTo: '/' })
}

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		await signIn('credentials', formData)
	} catch (error) {
		if (error instanceof Error && error.message.startsWith('NEXT_REDIRECT')) {
			redirect('/products')
		}
		console.log('catch in action', error)
		if (error instanceof AuthError) {
			return error.cause?.err?.message || 'Ошибка авторизации'
		}
		return 'Что-то пошло не так.'
	}
}
