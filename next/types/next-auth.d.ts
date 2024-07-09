import { IRole } from '@/lib/api/auth'
import NextAuth, {
	type DefaultSession,
	type User,
	type Session,
} from 'next-auth'
import { DefaultJWT, JWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface User {
		id: number
		name: string
		email: string
		password: string
		roles: IRole[]
		authToken: string
	}
	interface Session {
		user: {
			id: number
			name: string
			email: string
			password: string
			roles: IRole[]
			authToken: string
		}
		expires: ISODateString
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: number
		name: string
		email: string
		password: string
		roles: IRole[]
		authToken: string
	}
}
