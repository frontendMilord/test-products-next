import { IBreadcrumb } from '../../types/types'

export const generatePages = (currPage: number, totalPages: number) => {
	if (!totalPages) {
		return []
	}
	if (totalPages <= 10) {
		return new Array(totalPages).fill(0).map((_, i) => i + 1)
	}

	if (currPage <= 3) {
		return [1, 2, 3, '...', totalPages]
	}

	if (currPage >= totalPages - 2) {
		return [1, '...', totalPages - 2, totalPages - 1, totalPages]
	}

	return [
		1,
		'...',
		currPage - 2,
		currPage - 1,
		currPage,
		currPage + 1,
		currPage + 2,
		'...',
		totalPages,
	]
}

export const findBreadcrumbPath = (
	breadcrumbs: IBreadcrumb[],
	breadcrumb: IBreadcrumb
): IBreadcrumb[] => {
	const result = [breadcrumb]
	let currBreadcrumb = breadcrumb
	while (currBreadcrumb.parent) {
		const parent = breadcrumbs.find((b) => b.id === currBreadcrumb.parent)
		if (!parent) {
			break
		}
		currBreadcrumb = parent
		result.push(currBreadcrumb)
	}
	return result.reverse()
}

export const checkImageUrl = (url: string) => {
	if (url.startsWith('/')) {
		return `http://localhost:3002${url}`
	}
	return url
}
