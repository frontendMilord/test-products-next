import Products from '@/components/products/Products'
import ProductsHeader from '@/components/products/ProductsHeader'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Товары',
}

const ProductsPage = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string
		page?: string
	}
}) => {
	return (
		<div className='flex-1 flex flex-col items-center max-w-screen-lg mx-auto p-8'>
			<ProductsHeader />
			<Products searchParams={searchParams} />
		</div>
	)
}

export default ProductsPage
