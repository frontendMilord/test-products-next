'use client'

import { ChangeEvent, useState } from 'react'
import Input from '../Input'
import ImageFileInput from '../ImageFileInput'
import Modal from '../Modal'
import Select from '../Select'
import { useManufactoresStore } from '@/lib/store/manufactures'
import { createProduct } from '@/lib/api/products'
import { useSession } from 'next-auth/react'
import { IManufacture } from '../../../types/types'
import { ProductSchema } from '../../../types/schemas'
import { toast } from 'react-toastify'

interface ICreateProductFormProps {
	onClose: () => void
}

const CreateProductForm = ({ onClose }: ICreateProductFormProps) => {
	const session = useSession()
	const { manufactures } = useManufactoresStore((state) => state)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const [manufacture, setManufacture] = useState<IManufacture | null>(null)
	const [name, setName] = useState('')
	const [quantity, setQuantity] = useState('')
	const [price, setPrice] = useState('')

	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuantity(e.target.value)
	}

	const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value)
	}

	const validateForm = () => {
		const validatedFields = ProductSchema.safeParse({
			name,
			quantity,
			price,
		})
		if (!validatedFields.success) {
			return false
		}
		return true
	}

	const onCreateProduct = async () => {
		const authToken = session.data?.user.authToken
		if (!authToken || !validateForm() || !manufacture || !selectedImage) {
			toast.error('Пожалуйста заполните корректно поля')
			return
		}
		try {
			await createProduct({
				authToken,
				manufacturerId: manufacture.id,
				name,
				price,
				quantity: parseInt(quantity, 10) || 0,
				image: selectedImage,
			})
		} catch (e) {
			console.log(e)
		} finally {
			onClose()
		}
	}

	return (
		<Modal
			leftButtonTitle='Отмена'
			rightButtonTitle='Создать'
			onLeftButtonClick={onClose}
			onRightButtonClick={onCreateProduct}
			onClose={onClose}
			containerClassNames='flex flex-col items-center py-4 px-3 rounded-xl bg-slate-100'
		>
			<h2 className='font-medium mb-5'>Создание товара</h2>
			<form className='w-full flex flex-col gap-y-5'>
				<div className='flex-1 flex flex-col gap-1 px-2'>
					<label
						htmlFor='name'
						className='text-sm'
					>
						Название
					</label>
					<Input
						placeholder='Название'
						id='name'
						name='name'
						required
						value={name}
						onChange={onNameChange}
					/>
				</div>
				<div className='w-full flex flex-col gap-1 px-2'>
					<label
						htmlFor='quantity'
						className='text-sm'
					>
						Количество
					</label>
					<Input
						placeholder='Количество'
						id='quantity'
						name='quantity'
						required
						value={quantity}
						onChange={onQuantityChange}
					/>
				</div>
				<div className='flex flex-col gap-1 px-2'>
					<label
						htmlFor='price'
						className='text-sm'
					>
						Цена
					</label>
					<Input
						placeholder='Цена'
						id='price'
						name='price'
						required
						value={price}
						onChange={onPriceChange}
					/>
				</div>

				<div className='flex flex-col gap-1 px-2'>
					<label
						htmlFor='manufacture'
						className='text-sm'
					>
						Производитель
					</label>
					<Select
						defaultValue='Компания'
						selectedOption={{
							value: manufacture,
							label: manufacture?.name || '',
						}}
						options={manufactures.map((m) => ({ value: m, label: m.name }))}
						onChange={setManufacture}
					/>
				</div>

				<ImageFileInput
					previewImage={previewImage}
					selectedImage={selectedImage}
					setPreviewImage={setPreviewImage}
					setSelectedImage={setSelectedImage}
				/>
			</form>
		</Modal>
	)
}

export default CreateProductForm
