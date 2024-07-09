export type ProductsViewType = 'table' | 'cards'

export interface IProduct {
	id: number
	name: string
	quantity: number
	price: number
	photoUrl: string
	manufacturerId: number
}

export interface IRole {
	id: number
	name: string
	pages: string[]
}

export interface IBreadcrumb {
	id: number
	parent: number | null
	advertisement_count: number
	has_child_cache: boolean
	name_en_us: string
	name_ru: string
	name_src: string
}

export interface IManufacture {
	id: number
	name: string
}
