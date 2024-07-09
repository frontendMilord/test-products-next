import { create } from 'zustand'
import { IManufacture } from '../../../types/types'

interface ManufacturesState {
	manufactures: IManufacture[]
	setManufactures: (manufactures: IManufacture[]) => void
}

export const useManufactoresStore = create<ManufacturesState>()((set) => ({
	manufactures: [],
	setManufactures: (manufactures) =>
		set((state) => ({ manufactures: manufactures })),
}))
