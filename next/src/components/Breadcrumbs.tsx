import Link from 'next/link'
import { IBreadcrumb } from '../../types/types'

interface IBreadcrumbsProps {
	breadcrumbs: IBreadcrumb[]
	separator: string
}

const Breadcrumbs = ({ breadcrumbs, separator }: IBreadcrumbsProps) => {
	return (
		<div className='mt-4'>
			{breadcrumbs.map((breadcrumb, index) => (
				<Link
					key={breadcrumb.id}
					href={breadcrumb.name_en_us}
					className='font-medium text-xl'
				>
					{breadcrumb.name_ru} {index !== breadcrumbs.length - 1 && separator}
				</Link>
			))}
		</div>
	)
}

export default Breadcrumbs
