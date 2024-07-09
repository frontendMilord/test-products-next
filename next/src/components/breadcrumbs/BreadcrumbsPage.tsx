'use client'
import { findBreadcrumbPath } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { getBreadcrumbs, getRandomBreadcrumb } from '@/lib/api/breadcrumbs'
import { useSession } from 'next-auth/react'
import { IBreadcrumb } from '../../../types/types'
import Breadcrumbs from '../Breadcrumbs'
import Button from '../Button'
import { toast } from 'react-toastify'

const BreadcrumbsPage = () => {
	const session = useSession()
	const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[] | null>(null)
	const [randomBreadcrumb, setRandomBreadcrumb] = useState<IBreadcrumb | null>(
		null
	)
	const [foundBreadcrumbsPath, setFoundBreadcrumbsPath] = useState<
		IBreadcrumb[]
	>([])

	const onGetRandomBreadcrumbClick = async () => {
		const authToken = session?.data?.user.authToken
		if (!authToken) {
			return
		}
		const result = await getRandomBreadcrumb({ authToken })
		if ('message' in result) {
			toast.error(result.message)
			return
		}
		setRandomBreadcrumb(result)
	}

	useEffect(() => {
		const fetchBreadcrumbs = async () => {
			const authToken = session?.data?.user.authToken
			if (!authToken) {
				return
			}
			const [randomBreadCrumbResponse, allBreadcrumbsResponse] =
				await Promise.allSettled([
					getRandomBreadcrumb({ authToken }),
					getBreadcrumbs({ authToken }),
				])
			if (randomBreadCrumbResponse.status === 'fulfilled') {
				if (!('message' in randomBreadCrumbResponse.value)) {
					setRandomBreadcrumb(randomBreadCrumbResponse.value)
				} else {
					toast.error(randomBreadCrumbResponse.value.message)
				}
			}
			if (allBreadcrumbsResponse.status === 'fulfilled') {
				if (!('message' in allBreadcrumbsResponse.value)) {
					setBreadcrumbs(allBreadcrumbsResponse.value)
				} else {
					toast.error(allBreadcrumbsResponse.value.message)
				}
			}
		}
		fetchBreadcrumbs()
	}, [session?.data?.user.authToken])

	useEffect(() => {
		if (!randomBreadcrumb || !breadcrumbs) {
			return
		}
		const path = findBreadcrumbPath(breadcrumbs, randomBreadcrumb)
		setFoundBreadcrumbsPath(path)
	}, [breadcrumbs, randomBreadcrumb])

	if (session.status === 'loading') {
		return <div>Loading...</div>
	}

	return (
		<div className='max-w-5xl mx-auto w-full py-8 px-4'>
			<Button
				theme='slate'
				title='Получить новую конeчную точку'
				onClick={onGetRandomBreadcrumbClick}
			/>
			<Breadcrumbs
				breadcrumbs={foundBreadcrumbsPath}
				separator='> '
			/>
		</div>
	)
}

export default BreadcrumbsPage
