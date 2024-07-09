import { create } from 'zustand'
import { IProduct, ProductsViewType } from '../../../types/types'

interface ProductsState {
	products: IProduct[]
	pagesCount: number
	selectedView: ProductsViewType

	setProducts: (products: IProduct[]) => void
	setPagesCount: (pagesCount: number) => void
	setSelectedView: (selectedView: ProductsViewType) => void
}

export const useProductsStore = create<ProductsState>()((set) => ({
	products: [],
	pagesCount: 0,
	selectedView: 'table',
	setProducts: (products) => set((state) => ({ products })),
	setPagesCount: (pagesCount) => set((state) => ({ pagesCount })),
	setSelectedView: (selectedView) => set((state) => ({ selectedView })),
}))
