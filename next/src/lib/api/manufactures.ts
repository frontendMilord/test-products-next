import { IManufacture } from '../../../types/types'
import { baseUrl } from '../consts'

export const getManufacturers = async (authToken: string) => {
	try {
		const response = await fetch(`${baseUrl}/manufacturers`, {
			method: 'GET',
			headers: {
				authorization: `Token ${authToken}`,
			},
		})
		const result: IManufacture[] | { message: string } = await response.json()
		console.log('get manufactures', result)
		return result
	} catch (e) {
		console.log(e)
		return { message: e }
	}
}
