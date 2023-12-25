import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: 'PUPPY' | 'YOUNG' | 'ADULT' | 'OLD'
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  energy: 'LOW' | 'MEDIUM' | 'HIGH'
  independence: 'LOW' | 'MEDIUM' | 'HIGH'
  space: 'SMALL' | 'MEDIUM' | 'BIG'
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energy,
    independence,
    space,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      independence,
      space,
      organization_id: organizationId,
    })

    return { pet }
  }
}
