'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from '@/lib/hooks'
import Input from '../Input'

const ProductsSearch = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback((search: string) => {
		const params = new URLSearchParams(searchParams)
		if (search) {
			params.set('query', search)
		} else {
			params.delete('query')
		}
		params.set('page', '1')
		replace(`${pathname}?${params.toString()}`)
	}, 500)

	return (
		<div>
			<Input
				placeholder='Поиск'
				id='search'
				name='search'
				type='text'
				onChange={(e) => {
					handleSearch(e.target.value)
				}}
				defaultValue={searchParams.get('query')?.toString()}
			/>
		</div>
	)
}

export default ProductsSearch
