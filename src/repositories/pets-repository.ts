import { Pet, Prisma } from '@prisma/client'

export interface SearchManyProps {
  uf: string
  city: string
  age?: 'PUPPY' | 'YOUNG' | 'ADULT' | 'OLD'
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  energy?: 'LOW' | 'MEDIUM' | 'HIGH'
  independence?: 'LOW' | 'MEDIUM' | 'HIGH'
  space?: 'SMALL' | 'MEDIUM' | 'BIG'
}

export interface PetsRepository {
  searchMany(data: SearchManyProps): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
