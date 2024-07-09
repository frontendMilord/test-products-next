'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import Input from '../Input'
import ImageFileInput from '../ImageFileInput'
import Modal from '../Modal'
import Select from '../Select'
import { useManufactoresStore } from '@/lib/store/manufactures'
import { IManufacture, IProduct } from '../../../types/types'
import { useSession } from 'next-auth/react'
import { updateProduct } from '@/lib/api/products'
import { ProductSchema } from '../../../types/schemas'
import { toast } from 'react-toastify'

interface EditProductFormProps {
	product: IProduct
	onClose: () => void
}

const EditProductForm = ({ onClose, product }: EditProductFormProps) => {
	const session = useSession()
	const { manufactures } = useManufactoresStore((state) => state)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [previewImage, setPreviewImage] = useState<string | null>(
		product.photoUrl
	)
	const [manufacture, setManufacture] = useState<IManufacture | null>(null)
	const [name, setName] = useState(product.name)
	const [quantity, setQuantity] = useState(product.quantity.toString())
	const [price, setPrice] = useState(product.price.toString())

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

	const onUpdateProduct = async () => {
		const authToken = session.data?.user.authToken
		if (!authToken || !validateForm() || !manufacture || !selectedImage) {
			toast.error('Пожалуйста заполните корректно поля')
			return
		}
		try {
			await updateProduct({
				authToken,
				id: product.id,
				manufacturerId: manufacture.id,
				name,
				price,
				quantity: parseInt(quantity, 10) || 0,
				image: selectedImage,
			})
			toast.success('Товар успешно обновлен')
		} catch (e) {
			console.log(e)
			toast.error(e)
		} finally {
			onClose()
		}
	}

	useEffect(() => {
		if (manufacture) {
			return
		}
		const foundManufacture = manufactures.find(
			(m) => m.id === Number(product.manufacturerId)
		)
		if (foundManufacture) {
			setManufacture(foundManufacture)
		}
	}, [manufactures, manufacture, product.manufacturerId])

	return (
		<Modal
			leftButtonTitle='Отмена'
			rightButtonTitle='Сохранить'
			onLeftButtonClick={onClose}
			onRightButtonClick={onUpdateProduct}
			onClose={onClose}
			containerClassNames='flex flex-col items-center py-4 px-3 rounded-xl bg-slate-100'
		>
			<h2 className='font-medium mb-5'>Редактирование товара</h2>
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

export default EditProductForm
