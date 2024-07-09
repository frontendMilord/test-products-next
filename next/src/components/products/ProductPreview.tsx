'use client'

import React, { useState } from 'react'
import { IProduct } from '../../../types/types'
import Image from 'next/image'
import Modal from '../Modal'
import { createPortal } from 'react-dom'
import DeleteProductModal from './DeleteProductModal'
import { checkImageUrl } from '@/lib/utils'

interface IProductPreviewProps {
	product: IProduct
	manufactureName: string
	onClose: () => void
}

const ProductPreview = ({
	product,
	manufactureName,
	onClose,
}: IProductPreviewProps) => {
	const { name, photoUrl, price, quantity } = product
	const [isDeleteProductModalVisible, setIsDeleteProductModalVisible] =
		useState(false)

	return (
		<>
			{isDeleteProductModalVisible &&
				createPortal(
					<DeleteProductModal
						productId={product.id}
						onClose={() => setIsDeleteProductModalVisible(false)}
					/>,
					document.body
				)}
			<Modal
				leftButtonTitle='Удалить'
				rightButtonTitle='Назад'
				onLeftButtonClick={() => setIsDeleteProductModalVisible(true)}
				onRightButtonClick={onClose}
				onClose={onClose}
				containerClassNames={`flex flex-col items-center gap-y-5 py-7 px-14 rounded-xl bg-slate-100 text-sm text-start`}
			>
				{/* TODO change to next image
          <Image
					src={photoUrl}
					alt={`Фото товара ${name}`}
					width={224}
					height={224}
					className='rounded-xl'
				/> */}
				<img
					// src={photoUrl}
					src={checkImageUrl(photoUrl)}
					alt={`Фото товара ${name}`}
					className='rounded-xl w-56 h-56'
				/>
				<div className='w-full text-center font-medium text-lg'>{name}</div>
				<div className='w-full'>Количество: {quantity}</div>
				<div className='w-full'>Цена: {price} р</div>
				<div className='w-full'>Производитель: {manufactureName}</div>
			</Modal>
		</>
	)
}

export default ProductPreview
