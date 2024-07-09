import BreadcrumbsPage from '@/components/breadcrumbs/BreadcrumbsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Алгоритмы',
}

const Page = () => {
	return <BreadcrumbsPage />
}

export default Page
