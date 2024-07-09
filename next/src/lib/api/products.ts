import { IProduct } from '../../../types/types'
import { baseUrl } from '../consts'

interface IGetProductsProps {
	authToken: string
	query: string
	page: number
	limit?: number
}

export const getProducts = async ({
	authToken,
	page,
	query,
	limit = 8,
}: IGetProductsProps) => {
	try {
		const response = await fetch(
			`${baseUrl}/products?_limit=${limit}&_page=${page}&q=${query}`,
			{
				method: 'GET',
				headers: {
					authorization: `Token ${authToken}`,
				},
			}
		)
		const totalCount = Number(response.headers.get('X-Total-Count')) || 0
		const pagesCount = Math.ceil(totalCount / (limit || 1))
		const result: IProduct[] | { message: string } = await response.json()
		console.log('get products', result, totalCount)
		if ('message' in result) {
			return result
		}
		return { products: result, pagesCount }
	} catch (e) {
		console.log(e)
		return { message: e }
	}
}

interface IGetProductProps {
	authToken: string
	id: number
}

interface IGetProductResponse {
	product?: IProduct
	message?: string
}

export const getProduct = async ({ authToken, id }: IGetProductProps) => {
	try {
		const response = await fetch(`${baseUrl}/products/${id}`, {
			method: 'GET',
			headers: {
				authorization: `Token ${authToken}`,
			},
		})
		const result: IGetProductResponse = await response.json()
		console.log('get product', id, result)
		return result
	} catch (e) {
		console.log(e)
	}
}

interface ICreateProductProps {
	authToken: string
	name: string
	quantity: number
	price: string
	image: File
	manufacturerId: number
}

export const createProduct = async ({
	authToken,
	image,
	manufacturerId,
	name,
	price,
	quantity,
}: ICreateProductProps) => {
	try {
		const formData = new FormData()
		formData.append('image', image)
		formData.append('manufacturerId', manufacturerId.toString())
		formData.append('name', name)
		formData.append('price', price)
		formData.append('quantity', quantity.toString())
		const response = await fetch(`${baseUrl}/products`, {
			method: 'POST',
			headers: {
				authorization: `Token ${authToken}`,
			},
			body: formData,
		})
		const result: IProduct | { message: string } = await response.json()
		console.log('create product', result)
		return result
	} catch (e) {
		console.log(e)
	}
}

interface IUpdateProductProps {
	authToken: string
	id: number
	name: string
	quantity: number
	price: string
	image: File
	manufacturerId: number
}

export const updateProduct = async ({
	authToken,
	id,
	image,
	manufacturerId,
	name,
	price,
	quantity,
}: IUpdateProductProps) => {
	const formData = new FormData()
	formData.append('image', image)
	formData.append('manufacturerId', manufacturerId.toString())
	formData.append('name', name)
	formData.append('price', price)
	formData.append('quantity', quantity.toString())

	try {
		const response = await fetch(`${baseUrl}/products/${id}`, {
			method: 'PATCH',
			headers: {
				authorization: `Token ${authToken}`,
			},
			body: formData,
		})
		const result: IProduct | { message: string } = await response.json()
		console.log('update product', result)
		return result
	} catch (e) {
		console.log(e)
	}
}

interface IDeleteProductProps {
	authToken: string
	id: number
}

export const deleteProduct = async ({ authToken, id }: IDeleteProductProps) => {
	try {
		const response = await fetch(`${baseUrl}/products/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: `Token ${authToken}`,
			},
		})
		const result: { message: string } = await response.json()
		return result
	} catch (e) {
		console.log(e)
		return { message: e }
	}
}
