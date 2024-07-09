import { User } from 'next-auth'
import { baseUrl } from '../consts'
import { IRole } from '../../../types/types'

export interface LoginResponse {
	user: {
		id: number
		name: string
		email: string
		password: string
		roles: number[]
	}
	token: string
}

export const login = async (email: string, password: string) => {
	try {
		const response = await fetch(`${baseUrl}/login`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const loginResponse: LoginResponse | { error: string } =
			await response.json()
		console.log('login response', loginResponse)

		if ('error' in loginResponse) {
			return loginResponse.error
		}
		const user: User = {
			authToken: loginResponse.token,
			email: loginResponse.user.email,
			name: loginResponse.user.name,
			password: loginResponse.user.password,
			roles: [],
		}
		return user
	} catch (e) {
		console.log('error in Login', e)
		return 'Ошибка авторизации'
	}
}

interface IGetMeResponse {
	roles: IRole[]
	user: User
}

export const getMe = async (authToken: string) => {
	if (!authToken) {
		return { message: 'No auth token. Error get user' }
	}
	try {
		const response = await fetch(`${baseUrl}/me`, {
			method: 'GET',
			headers: {
				authorization: `Token ${authToken}`,
			},
		})
		if (!response.ok) {
			return { message: 'Server error' }
		}
		const result: IGetMeResponse | { message: string } = await response.json()
		console.log('getMe result', result)
		return result
	} catch (error) {
		return { message: 'Error get user' }
	}
}
