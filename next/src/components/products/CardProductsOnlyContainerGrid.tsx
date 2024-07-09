'use client'

import { IManufacture, IProduct } from '../../../types/types'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import ProductPreview from './ProductPreview'
import { checkImageUrl } from '@/lib/utils'

interface ICardProductsProps {
	products: IProduct[]
	manufactures: IManufacture[]
}

const CardProductsOnlyContainerGrid = ({
	products,
	manufactures,
}: ICardProductsProps) => {
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
	const [isProductPreviewModalVisible, setIsProductPreviewModalVisible] =
		useState(false)

	const onOpen = (product: IProduct) => {
		setIsProductPreviewModalVisible(true)
		setSelectedProduct(product)
	}

	const onClose = () => {
		setIsProductPreviewModalVisible(false)
		setSelectedProduct(null)
	}
	if (!products?.length) {
		return <div className='w-full text-center'>Ничего не найдено.</div>
	}

	return (
		<>
			{isProductPreviewModalVisible &&
				selectedProduct &&
				createPortal(
					<ProductPreview
						product={selectedProduct}
						manufactureName={
							manufactures.find((m) => m.id === selectedProduct.manufacturerId)
								?.name || ''
						}
						onClose={onClose}
					/>,
					document.body
				)}
			<table className='w-full select-none cursor-pointer'>
				<tbody className='grid grid-rows-2 grid-cols-4 gap-[10px]'>
					{products.map((product) => (
						<tr
							key={product.id}
							className='flex flex-col justify-center gap-y-2 text-center text-xs hover:bg-[#0f172a0f] rounded-xl 
                p-[10px] duration-150'
							onClick={() => onOpen(product)}
						>
							<td className='mb-[2px]'>
								<img
									// src={product.photoUrl}
									src={checkImageUrl(product.photoUrl)}
									className='w-56 h-56 rounded-xl'
								/>

								{/* //TODO: Change to Image
                <Image
								src={product.photoUrl}
								alt={`Фото ${product.name}`}
								width={56}
								height={56}
							/> */}
							</td>
							<td
								title={product.name}
								className='flex-1 break-words leading-normal text-base mb-2'
							>
								{product.name}
							</td>
							<td
								title={
									manufactures.find((m) => m.id === product.manufacturerId)
										?.name || ''
								}
								className='truncate'
							>
								{manufactures.find((m) => m.id === product.manufacturerId)
									?.name || ''}
							</td>
							<td className='grid grid-cols-2 justify-between p-3'>
								<div>{product.quantity} шт</div>
								<div>{product.price} р</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default CardProductsOnlyContainerGrid
