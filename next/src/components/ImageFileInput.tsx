'use client'
import { checkImageUrl } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface ImageFileInputProps {
	selectedImage: File | null
	setSelectedImage: (file: File | null) => void
	previewImage: string | null
	setPreviewImage: (url: string | null) => void
}

const ImageFileInput = ({
	selectedImage,
	setSelectedImage,
	previewImage,
	setPreviewImage,
}: ImageFileInputProps) => {
	const [loading, setLoading] = useState(false)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			setSelectedImage(file)
			const imageUrl = URL.createObjectURL(file)
			console.log('uploaded url', imageUrl)
			setPreviewImage(imageUrl)
		}
	}

	const onDeleteImageClick = () => {
		setSelectedImage(null)
		setPreviewImage(null)
	}

	useEffect(() => {
		if (previewImage) {
			setLoading(true)
			fetch(checkImageUrl(previewImage))
				.then((res) => res.blob())
				.then((blob) => {
					const file = new File([blob], previewImage, { type: blob.type })
					setSelectedImage(file)
					setPreviewImage(previewImage)
				})
				.catch((e) => {
					console.log('error fetch image', e)
					setPreviewImage(null)
					setSelectedImage(null)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [setSelectedImage, setPreviewImage, previewImage])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className='px-2 flex flex-col gap-y-1'>
			<div>Фото</div>
			{selectedImage ? (
				<div className='flex justify-between items-center gap-x-4'>
					{previewImage && (
						//TODO change to Image
						// <Image
						// 	src={previewImage}
						// 	width={56}
						// 	height={56}
						// 	alt='Selected'
						// 	className='w-14 h-14 rounded-md'
						// />
						<img
							src={checkImageUrl(previewImage)}
							alt='preview image'
							className='w-14 h-14 rounded-md'
						/>
					)}
					<div className='flex justify-between gap-x-3 items-center'>
						<div className='text-xs text-gray-600 truncate'>
							{selectedImage.name}
						</div>
						<div
							onClick={onDeleteImageClick}
							className='cursor-pointer'
						>
							<svg
								width='14'
								height='14'
								viewBox='0 0 14 14'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M0.71967 0.21967C1.01256 -0.0732233 1.48744 -0.0732233 1.78033 0.21967L7.25 5.68934L12.7197 0.219671C13.0126 -0.0732225 13.4874 -0.0732225 13.7803 0.219671C14.0732 0.512564 14.0732 0.987438 13.7803 1.28033L8.31066 6.75L13.7803 12.2197C14.0732 12.5126 14.0732 12.9874 13.7803 13.2803C13.4874 13.5732 13.0126 13.5732 12.7197 13.2803L7.25 7.81066L1.78033 13.2803C1.48744 13.5732 1.01256 13.5732 0.71967 13.2803C0.426777 12.9874 0.426777 12.5126 0.71967 12.2197L6.18934 6.75L0.71967 1.28033C0.426777 0.987437 0.426777 0.512563 0.71967 0.21967Z'
									fill='#475569'
								/>
							</svg>
						</div>
					</div>
				</div>
			) : (
				<div className='flex flex-col items-center gap-y-2'>
					<label
						htmlFor='file-upload'
						className='px-4 py-2 cursor-pointer flex flex-col gap-y-3 items-center text-gray-600 text-sm'
					>
						Загрузить фото
						<svg
							width='22'
							height='20'
							viewBox='0 0 22 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M4.47812 3.93387C4.67178 3.30448 5.25329 2.875 5.91179 2.875H8C8.41421 2.875 8.75 2.53921 8.75 2.125C8.75 1.71079 8.41421 1.375 8 1.375H5.91179C4.59478 1.375 3.43177 2.23397 3.04446 3.49274L0.632663 11.3311C0.544715 11.6169 0.5 11.9143 0.5 12.2133V16.375C0.5 18.0319 1.84315 19.375 3.5 19.375H18.5C20.1569 19.375 21.5 18.0319 21.5 16.375V12.2133C21.5 11.9143 21.4553 11.6169 21.3673 11.3311L18.9555 3.49274C18.5682 2.23397 17.4052 1.375 16.0882 1.375H14C13.5858 1.375 13.25 1.71079 13.25 2.125C13.25 2.53921 13.5858 2.875 14 2.875H16.0882C16.7467 2.875 17.3282 3.30448 17.5219 3.93387L19.7345 11.125H16.8906C15.7543 11.125 14.7155 11.767 14.2073 12.7834L13.9511 13.2958C13.697 13.804 13.1776 14.125 12.6094 14.125H9.39058C8.82242 14.125 8.30302 13.804 8.04894 13.2958L7.79271 12.7834C7.28453 11.767 6.24574 11.125 5.10942 11.125H2.26547L4.47812 3.93387Z'
								fill='#475569'
							/>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M11 0.625C11.4142 0.625 11.75 0.960786 11.75 1.375V7.81434L13.4697 6.09467C13.7626 5.80178 14.2374 5.80178 14.5303 6.09467C14.8232 6.38756 14.8232 6.86244 14.5303 7.15533L11.5303 10.1553C11.2374 10.4482 10.7626 10.4482 10.4697 10.1553L7.46967 7.15533C7.17678 6.86244 7.17678 6.38756 7.46967 6.09467C7.76256 5.80178 8.23744 5.80178 8.53033 6.09467L10.25 7.81434V1.375C10.25 0.960786 10.5858 0.625 11 0.625Z'
								fill='#475569'
							/>
						</svg>
					</label>

					<input
						id='file-upload'
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						className='hidden'
					/>
				</div>
			)}
		</div>
	)
}

export default ImageFileInput
