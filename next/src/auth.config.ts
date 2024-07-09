import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'
import { getMe, login } from '@/lib/api/auth'
import { LoginSchema } from '../types/schemas'

const redirectRoute = '/products'
const loginRoute = '/'

export const authConfig = {
	pages: {
		signIn: loginRoute,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.authToken = user.authToken
				token.id = Number(user.id) || 1
				token.name = user.name || ''
				token.roles = user.roles
			}
			return token
		},
		async session({ session, token }) {
			session.user.authToken = token.authToken
			session.user.roles = token.roles
			return session
		},
		async authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user
			const path = nextUrl.pathname

			if (!isLoggedIn) {
				if (path === loginRoute) {
					return true
				}
				return NextResponse.redirect(new URL(loginRoute, nextUrl))
			}

			if (nextUrl.pathname === redirectRoute) {
				return true
			}

			if (path === loginRoute) {
				return NextResponse.redirect(new URL(redirectRoute, nextUrl))
			}

			//enough permission
			if (auth?.user?.roles?.some((role) => role?.pages?.includes(path))) {
				return true
			}

			return NextResponse.redirect(new URL(redirectRoute, nextUrl))
		},
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const parsedCredentials = LoginSchema.safeParse(credentials)

				if (!parsedCredentials.success) {
					throw new Error('Пожалуйста введите корректные даные')
				}

				const { email, password } = parsedCredentials.data
				const loginResult = await login(email, password)

				if (typeof loginResult === 'string') {
					throw new Error(loginResult)
				}

				const getMeResult = await getMe(loginResult.authToken)

				if ('message' in getMeResult) {
					throw new Error(getMeResult.message)
				}

				return {
					...loginResult,
					roles: getMeResult.roles,
				}
			},
		}),
	],
} satisfies NextAuthConfig
