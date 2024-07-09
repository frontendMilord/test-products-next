'use client'
import { useState } from 'react'
import Button from '../Button'
import { createPortal } from 'react-dom'
import CreateProductForm from './CreateProductForm'

const AddProductButton = () => {
	const [isCreateProductModalVisible, setIsCreateProductModalVisible] =
		useState(false)

	const onAddButtonClick = () => {
		setIsCreateProductModalVisible((prev) => !prev)
	}

	return (
		<>
			<Button
				title='Добавить'
				theme='slate'
				onClick={onAddButtonClick}
			/>
			{isCreateProductModalVisible &&
				createPortal(
					<CreateProductForm
						onClose={() => setIsCreateProductModalVisible(false)}
					/>,
					document.body
				)}
		</>
	)
}

export default AddProductButton
