import { Pet, Prisma } from '@prisma/client'

export interface SearchManyProps {
  uf: string
  city: string
  age?: 'PUPPY' | 'YOUNG' | 'ADULT' | 'OLD' | null
  size?: 'SMALL' | 'MEDIUM' | 'BIG' | null
  energy?: 'LOW' | 'MEDIUM' | 'HIGH' | null
  independence?: 'LOW' | 'MEDIUM' | 'HIGH' | null
  space?: 'SMALL' | 'MEDIUM' | 'BIG' | null
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  searchMany(data: SearchManyProps): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
