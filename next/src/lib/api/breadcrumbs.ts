import { IBreadcrumb } from '../../../types/types'
import { baseUrl } from '../consts'

interface IGetBreadcrumbsProps {
	authToken: string
}

export const getBreadcrumbs = async ({ authToken }: IGetBreadcrumbsProps) => {
	try {
		const response = await fetch(`${baseUrl}/breadcrumbs`, {
			method: 'GET',
			headers: {
				authorization: `Token ${authToken}`,
			},
		})
		const result: IBreadcrumb[] | { message: string } = await response.json()
		console.log('get breadcrumbs', result)
		return result
	} catch (e) {
		console.log(e)
		return { message: e }
	}
}

interface IGetRandomBreadcrumbProps {
	authToken: string
}

export const getRandomBreadcrumb = async ({
	authToken,
}: IGetRandomBreadcrumbProps) => {
	try {
		const response = await fetch(`${baseUrl}/random_breadcrumb`, {
			method: 'GET',
			headers: {
				authorization: `Token ${authToken}`,
			},
		})
		const result: IBreadcrumb | { message: string } = await response.json()
		console.log('get random breadcrumb', result)
		return result
	} catch (e) {
		console.log(e)
		return { message: e }
	}
}
