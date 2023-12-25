import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreateSearchPetUseCaseRequest {
  uf: string
  city: string
  age?: 'PUPPY' | 'YOUNG' | 'ADULT' | 'OLD'
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  energy?: 'LOW' | 'MEDIUM' | 'HIGH'
  independence?: 'LOW' | 'MEDIUM' | 'HIGH'
  space?: 'SMALL' | 'MEDIUM' | 'BIG'
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
