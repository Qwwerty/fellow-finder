import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreateSearchPetUseCaseRequest {
  uf: string
  city: string
  age?: 'PUPPY' | 'YOUNG' | 'ADULT' | 'OLD' | null
  size?: 'SMALL' | 'MEDIUM' | 'BIG' | null
  energy?: 'LOW' | 'MEDIUM' | 'HIGH' | null
  independence?: 'LOW' | 'MEDIUM' | 'HIGH' | null
  space?: 'SMALL' | 'MEDIUM' | 'BIG' | null
}

interface CreateSearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    uf,
    city,
    age,
    size,
    energy,
    independence,
    space,
  }: CreateSearchPetUseCaseRequest): Promise<CreateSearchPetsUseCaseResponse> {
    console.log('SearchPetsUseCase')
    const pets = await this.petsRepository.searchMany({
      uf,
      city,
      age,
      size,
      energy,
      independence,
      space,
    })

    return { pets }
  }
}
