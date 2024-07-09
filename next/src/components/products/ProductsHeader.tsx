import AddProductButton from './AddProductButton'
import ProductsSearch from './ProductsSearch'
import ProductsView from './ProductsView'

const ProductsHeader = () => {
	return (
		<div className='w-full flex justify-between items-center gap-x-4 p-3 mb-8'>
			<ProductsSearch />
			<ProductsView />
			<AddProductButton />
		</div>
	)
}

export default ProductsHeader
