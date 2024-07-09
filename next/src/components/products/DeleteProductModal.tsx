'use client'
import { deleteProduct } from '@/lib/api/products'
import Modal from '../Modal'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

interface DeleteProductModalProps {
	productId: number
	onClose: () => void
}

const DeleteProductModal = ({
	onClose,
	productId,
}: DeleteProductModalProps) => {
	const session = useSession()

	const onDelete = async () => {
		const authToken = session.data?.user.authToken
		if (!authToken) {
			return
		}
		try {
			const result = await deleteProduct({ authToken, id: productId })
			toast.success(result.message)
			onClose()
		} catch (e) {
			console.log(e)
			toast.error(e)
		}
	}
	return (
		<Modal
			leftButtonTitle='Отменить'
			rightButtonTitle='Удалить'
			onLeftButtonClick={onClose}
			onRightButtonClick={onDelete}
			onClose={onClose}
			containerClassNames='flex flex-col items-center p-4 rounded-xl bg-slate-100'
			z={20}
		>
			<div className='text-2xl font-medium mb-6'>
				Вы действительно хотите
				<br /> удалить товар?
			</div>
		</Modal>
	)
}

export default DeleteProductModal
