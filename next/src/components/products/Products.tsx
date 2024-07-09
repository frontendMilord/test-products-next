'use client'
import React, { useEffect } from 'react'
import { getProducts } from '../../lib/api/products'
import { useProductsStore } from '@/lib/store/products'
import TableProducts from './TableProducts'
import CardProducts from './CardProducts'
import Pagination from '../Pagination'
import { useManufactoresStore } from '@/lib/store/manufactures'
import { getManufacturers } from '@/lib/api/manufactures'
import { useSession } from 'next-auth/react'
import CardProductsOnlyContainerGrid from './CardProductsOnlyContainerGrid'
import { toast } from 'react-toastify'

interface ProductsProps {
	searchParams?: {
		query?: string
		page?: string
	}
}

const Products = ({ searchParams }: ProductsProps) => {
	const { data: session, status } = useSession()
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const { products, setProducts, pagesCount, setPagesCount, selectedView } =
		useProductsStore((state) => state)
	const { manufactures, setManufactures } = useManufactoresStore(
		(state) => state
	)

	useEffect(() => {
		if (!session?.user.authToken) {
			return
		}
		const authToken = session.user.authToken
		const fetchData = async () => {
			const productsPromise = getProducts({
				authToken,
				page,
				query,
			})
			const manufacturesPromise = getManufacturers(authToken)
			const [products, manufactures] = await Promise.allSettled([
				productsPromise,
				manufacturesPromise,
			])
			if (products.status === 'fulfilled') {
				if ('message' in products.value) {
					toast.error(products.value.message)
					return
				}
				const { products: newProducts, pagesCount } = products.value
				setProducts(newProducts)
				setPagesCount(Number(pagesCount))
			}
			if (manufactures.status === 'fulfilled') {
				if ('message' in manufactures.value) {
					toast.error(manufactures.value.message)
					return
				}
				setManufactures(manufactures.value)
			}
		}
		fetchData()
	}, [session, page, query])

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	return (
		<div className='w-full'>
			{selectedView === 'table' ? (
				<TableProducts
					products={products}
					manufactures={manufactures}
				/>
			) : (
				// <CardProducts
				// 	products={products}
				// 	manufactures={manufactures}
				// />
				<CardProductsOnlyContainerGrid
					products={products}
					manufactures={manufactures}
				/>
			)}

			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={pagesCount} />
			</div>
		</div>
	)
}

export default Products
