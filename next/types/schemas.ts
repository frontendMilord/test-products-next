import { z } from 'zod'

export const ProductSchema = z.object({
	name: z.string({ required_error: 'Название обязательное' }),
	quantity: z.coerce.number({ required_error: 'Количество обязательное' }),
	price: z.coerce.number({ required_error: 'Цена обязательная' }),
})

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3),
})
